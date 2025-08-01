import { sfxDistance } from '../../../../../effect.js'
import { minFlickVR } from '../../../../../flick.js'
import { note } from '../../../../../note.js'
import { scaledScreen } from '../../../../../scaledScreen.js'
import { getZ, layer } from '../../../../../skin.js'
import { disallowEmpty } from '../../../../InputManager.js'
import { FlickNote } from '../FlickNote.js'
export class TraceFlickNote extends FlickNote {
    earlyInputTime = this.entityMemory(Number)
    earlyHitTime = this.entityMemory(Number)
    earlyHitIsCorrectDirection = this.entityMemory(Boolean)
    diamondLayout = this.entityMemory(Rect)
    diamondZ = this.entityMemory(Number)
    initialize() {
        super.initialize()
        this.earlyInputTime = this.targetTime + input.offset
        this.earlyHitTime = -9999
        if (!this.useFallbackSprites) {
            const w = note.h / scaledScreen.wToH
            new Rect({
                l: this.import.lane - w,
                r: this.import.lane + w,
                b: 1 + note.h,
                t: 1 - note.h,
            }).copyTo(this.diamondLayout)
            this.diamondZ = getZ(layer.note.tick, this.targetTime, this.import.lane)
        }
    }
    touch() {
        if (time.now < this.inputTime.min) return
        if (time.now < this.earlyInputTime) {
            this.earlyTouch()
        } else {
            this.lateTouch()
        }
    }
    updateParallel() {
        this.triggerEarlyTouch()
        super.updateParallel()
    }
    earlyTouch() {
        for (const touch of touches) {
            if (touch.vr < minFlickVR) continue
            if (!this.fullHitbox.contains(touch.position)) continue
            disallowEmpty(touch)
            this.earlyHitTime = touch.time
            this.earlyHitIsCorrectDirection = this.isCorrectDirection(touch)
            return
        }
    }
    lateTouch() {
        for (const touch of touches) {
            if (touch.vr < minFlickVR) continue
            if (!this.fullHitbox.contains(touch.lastPosition)) continue
            disallowEmpty(touch)
            this.completeTraceFlick(
                Math.max(touch.time, this.targetTime),
                this.isCorrectDirection(touch),
            )
            return
        }
    }
    triggerEarlyTouch() {
        if (this.despawn) return
        if (time.now < this.earlyInputTime) return
        if (this.earlyHitTime === -9999) return
        this.completeTraceFlick(this.earlyHitTime, this.earlyHitIsCorrectDirection)
        this.despawn = true
    }
    render() {
        super.render()
        if (!this.useFallbackSprites) {
            this.sprites.diamond.draw(this.diamondLayout.mul(this.y), this.diamondZ, 1)
        }
    }
    playNoteEffects() {
        this.playDirectionalNoteEffect()
    }
    playSlotEffects() {
        // removed
    }
    playSlotLinears() {
        // removed
    }
    playLaneEffects() {
        // removed
    }
    completeTraceFlick(hitTime, isCorrectDirection) {
        this.result.judgment = input.judge(hitTime, this.targetTime, this.windows)
        this.result.accuracy = hitTime - this.targetTime
        if (!isCorrectDirection) {
            if (this.result.judgment === Judgment.Perfect) this.result.judgment = Judgment.Great
            if (this.result.accuracy < this.windows.perfect.max) {
                this.flickExport('accuracyDiff', this.result.accuracy - this.windows.perfect.max)
                this.result.accuracy = this.windows.perfect.max
            }
        }
        this.result.bucket.index = this.bucket.index
        this.result.bucket.value = this.result.accuracy * 1000
        this.playHitEffects(time.now)
        this.despawn = true
    }
    playSFX() {
        if ('fallback' in this.clips && this.useFallbackClip) {
            this.clips.fallback.play(sfxDistance)
        } else {
            this.clips.perfect.play(sfxDistance)
        }
    }
    get useFallbackSprites() {
        return (
            !this.sprites.left.exists ||
            !this.sprites.middle.exists ||
            !this.sprites.right.exists ||
            !this.sprites.diamond.exists
        )
    }
}
