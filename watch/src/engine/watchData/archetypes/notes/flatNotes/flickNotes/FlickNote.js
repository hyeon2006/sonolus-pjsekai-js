import { getArrowSpriteId } from '../../../../../../../../shared/src/engine/data/arrowSprites.js'
import { options } from '../../../../../configuration/options.js'
import { linearEffectLayout } from '../../../../particle.js'
import { scaledScreen } from '../../../../scaledScreen.js'
import { getZ, layer, skin } from '../../../../skin.js'
import { FlatNote } from '../FlatNote.js'
import { archetypes } from '../../../index.js'
export class FlickNote extends FlatNote {
    flickImport = this.defineImport({
        direction: { name: 'direction', type: DataType },
        accuracyDiff: { name: 'accuracyDiff', type: Number },
    })
    arrow = this.entityMemory({
        sprite: SkinSpriteId,
        layout: Quad,
        animation: Vec,
        z: Number,
    })
    lifetime = this.entityMemory(Number)
    check = this.entityMemory(Boolean)
    preprocess() {
        super.preprocess()
        if (options.mirror) {
            this.flickImport.direction *= -1
        }
    }
    globalInitialize() {
        super.globalInitialize()
        this.arrow.sprite = getArrowSpriteId(
            this.arrowSprites,
            this.import.size,
            this.flickImport.direction,
        )
        if (skin.sprites.exists(this.arrow.sprite)) {
            const w = (Math.clamp(this.import.size, 0, 3) * (-this.flickImport.direction || 1)) / 2
            new Rect({
                l: this.import.lane - w,
                r: this.import.lane + w,
                b: 1,
                t: 1 - 2 * Math.abs(w) * scaledScreen.wToH,
            })
                .toQuad()
                .copyTo(this.arrow.layout)
        } else {
            this.arrow.sprite = this.arrowSprites.fallback.id
            const w = Math.clamp(this.import.size / 2, 1, 2)
            new Rect({ l: -1, r: 1, b: 1, t: -1 })
                .toQuad()
                .rotate((Math.PI / 6) * this.flickImport.direction)
                .scale(w, w * scaledScreen.wToH)
                .translate(this.import.lane, 1 - w * scaledScreen.wToH)
                .copyTo(this.arrow.layout)
        }
        if (options.markerAnimation)
            new Vec(this.flickImport.direction, -2 * scaledScreen.wToH).copyTo(this.arrow.animation)
        this.arrow.z = getZ(layer.note.arrow, this.targetTime, this.import.lane)
    }
    get hitTime() {
        return (
            this.targetTime +
            (replay.isReplay ? this.import.accuracy + this.flickImport.accuracyDiff : 0)
        )
    }
    render() {
        super.render()
        if (time.now > this.hitTime + time.delta) return
        if (options.markerAnimation) {
            const s = Math.mod(time.now, 0.5) / 0.5
            skin.sprites.draw(
                this.arrow.sprite,
                this.arrow.layout.add(this.arrow.animation.mul(s)).mul(this.y),
                this.arrow.z,
                1 - Math.ease('In', 'Cubic', s),
            )
        } else {
            skin.sprites.draw(this.arrow.sprite, this.arrow.layout.mul(this.y), this.arrow.z, 1)
        }
    }
    playNoteEffects() {
        super.playNoteEffects()
        this.playDirectionalNoteEffect()
    }
    playDirectionalNoteEffect() {
        this.directionalEffect.spawn(
            linearEffectLayout({
                lane: this.import.lane,
                shear:
                    (options.version == 1 ? (this.critical ? 2.5 : 1) : 1) *
                    this.flickImport.direction,
            }),
            0.32,
            false,
        )
    }
    get critical() {
        return false
    }
}
