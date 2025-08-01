import { note } from '../../../../../note.js'
import { scaledScreen } from '../../../../../scaledScreen.js'
import { getZ, layer } from '../../../../../skin.js'
import { FlickNote } from '../FlickNote.js'
export class TraceFlickNote extends FlickNote {
    diamondLayout = this.entityMemory(Rect)
    diamondZ = this.entityMemory(Number)
    get useFallbackSprites() {
        return (
            !this.sprites.left.exists ||
            !this.sprites.middle.exists ||
            !this.sprites.right.exists ||
            !this.sprites.diamond.exists
        )
    }
    globalInitialize() {
        super.globalInitialize()
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
    render() {
        super.render()
        if (time.now > this.hitTime + time.delta) return
        if (!this.useFallbackSprites) {
            this.sprites.diamond.draw(this.diamondLayout.mul(this.y), this.diamondZ, 1)
        }
    }
    playNoteEffects() {
        this.playDirectionalNoteEffect()
    }
    playLaneEffects() {
        // removed
    }
    playSlotLinears() {
        // removed
    }
    spawnSlotEffects() {
        // removed
    }
}
