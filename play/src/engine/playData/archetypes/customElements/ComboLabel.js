import { NormalLayout } from '../../../../../../shared/src/engine/data/utils.js'
import { getZ, layer, skin } from '../../skin.js'
import { options } from '../../../configuration/options.js'
export class ComboLabel extends SpawnableArchetype({
    time: Number,
    judgment: Number,
}) {
    z = this.entityMemory(Number)
    z2 = this.entityMemory(Number)
    check = this.entityMemory(Boolean)
    comboCheck = levelMemory(Number)
    combo = this.entityMemory(Number)
    ap = levelMemory(Boolean)
    initialize() {
        this.z = getZ(layer.judgment, this.spawnData.time, 0)
        this.z2 = getZ(layer.judgment - 1, this.spawnData.time, 0)
    }
    updateParallel() {
        if (this.combo != this.comboCheck) {
            this.despawn = true
            return
        }
        if (this.combo == 0) {
            this.despawn = true
            return
        }
        const h = 0.04225 * ui.configuration.combo.scale
        const w = h * 3.22 * 6.65
        const centerX = 5.337
        const centerY = 0.485
        const a2 = ui.configuration.combo.alpha * 0.8 * ((Math.cos(time.now * Math.PI) + 1) / 2)
        const layout = NormalLayout({
            l: centerX - w / 2,
            r: centerX + w / 2,
            t: centerY - h / 2,
            b: centerY + h / 2,
        })
        if (this.ap || !options.ap)
            skin.sprites.combo.draw(layout, this.z, ui.configuration.combo.alpha)
        else {
            skin.sprites.apCombo.draw(layout, this.z, ui.configuration.combo.alpha)
            skin.sprites.glowCombo.draw(layout, this.z2, a2)
        }
    }
    updateSequential() {
        if (this.check) return
        this.check = true
        if (this.spawnData.judgment == Judgment.Miss || this.spawnData.judgment == Judgment.Good) {
            this.comboCheck = 0
            this.combo = this.comboCheck
        } else {
            this.comboCheck += 1
            this.combo = this.comboCheck
        }
        if (this.spawnData.judgment != Judgment.Perfect) this.ap = true
    }
    terminate() {
        this.check = false
        this.z = 0
        this.z2 = 0
    }
}
