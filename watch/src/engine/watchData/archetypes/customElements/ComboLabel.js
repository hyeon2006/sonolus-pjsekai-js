import { NormalLayout } from '../../../../../../shared/src/engine/data/utils.js'
import { options } from '../../../configuration/options.js'
import { getZ, layer, skin } from '../../skin.js'
import { archetypes } from '../index.js'
export class ComboLabel extends SpawnableArchetype({}) {
    preprocessOrder = 5
    check = this.entityMemory(Boolean)
    z = this.entityMemory(Number)
    z2 = this.entityMemory(Number)
    customCombo = this.defineSharedMemory({
        value: Tuple(4, Number),
        time: Number,
        scaledTime: Number,
        length: Number,
        start: Number,
        combo: Number,
        judgment: DataType,
        tail: Number,
        ap: Boolean,
        accuracy: Number,
        fastLate: Number,
    })
    initialize() {
        this.z = getZ(layer.judgment, 0, 0)
        this.z2 = getZ(layer.judgment - 1, 0, 0)
    }
    spawnTime() {
        return -999999
    }
    despawnTime() {
        return 999999
    }
    updateParallel() {
        if (time.now < this.customCombo.get(this.customCombo.get(0).start).time) return
        if (this.customCombo.get(this.head).combo == 0) return
        const h = 0.04225 * ui.configuration.combo.scale
        const w = h * 3.22 * 6.65
        const centerX = 5.337
        const centerY = 0.485
        const a = ui.configuration.combo.alpha * 0.8 * ((Math.cos(time.now * Math.PI) + 1) / 2)
        const layout = NormalLayout({
            l: centerX - w / 2,
            r: centerX + w / 2,
            t: centerY - h / 2,
            b: centerY + h / 2,
        })
        if (this.customCombo.get(this.head).ap == true || !options.ap)
            skin.sprites.combo.draw(layout, this.z, ui.configuration.combo.alpha)
        else {
            skin.sprites.apCombo.draw(layout, this.z, ui.configuration.combo.alpha)
            skin.sprites.glowCombo.draw(layout, this.z2, a)
        }
    }
    get head() {
        return archetypes.ComboNumber.searching.get(0).head
    }
}
