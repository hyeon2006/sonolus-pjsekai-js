import { NormalLayout } from '../../../../../../shared/src/engine/data/utils.js'
import { getZ, layer, skin } from '../../skin.js'
import { scaledScreen } from '../../scaledScreen.js'
export class Damage extends SpawnableArchetype({
    time: Number,
}) {
    endTime = this.entityMemory(Number)
    z = this.entityMemory(Number)
    check = this.entityMemory(Boolean)
    comboCheck = levelMemory(Number)
    combo = this.entityMemory(Number)
    initialize() {
        this.z = getZ(layer.damage, this.spawnData.time, 0)
        this.endTime = this.spawnData.time + 0.35
    }
    updateParallel() {
        if (time.now > this.endTime) {
            this.despawn = true
            return
        }
        if (this.combo != this.comboCheck) {
            this.despawn = true
            return
        }
        if (this.combo == 0) {
            this.despawn = true
            return
        }
        const t = Math.unlerp(this.spawnData.time, this.endTime, time.now)
        const a = 0.768 * Math.pow(t, 0.1) * Math.pow(1 - t, 1.35)
        const layout1 = NormalLayout({
            l: scaledScreen.l,
            r: 0,
            t: scaledScreen.t + scaledScreen.wToH,
            b: scaledScreen.b + scaledScreen.wToH,
        })
        const layout2 = NormalLayout({
            l: -scaledScreen.l,
            r: 0,
            t: scaledScreen.t + scaledScreen.wToH,
            b: scaledScreen.b + scaledScreen.wToH,
        })
        const layout3 = NormalLayout({
            l: scaledScreen.l,
            r: 0,
            t: scaledScreen.b - scaledScreen.t + scaledScreen.wToH,
            b: scaledScreen.b + scaledScreen.wToH,
        })
        const layout4 = NormalLayout({
            l: -scaledScreen.l,
            r: 0,
            t: scaledScreen.b - scaledScreen.t + scaledScreen.wToH,
            b: scaledScreen.b + scaledScreen.wToH,
        })
        skin.sprites.damage.draw(layout1, this.z, a)
        skin.sprites.damage.draw(layout2, this.z, a)
        skin.sprites.damage.draw(layout3, this.z, a)
        skin.sprites.damage.draw(layout4, this.z, a)
    }
    updateSequential() {
        if (this.check) return
        this.check = true
        {
            this.comboCheck += 1
            this.combo = this.comboCheck
        }
    }
    terminate() {
        this.check = false
        this.z = 0
    }
}
