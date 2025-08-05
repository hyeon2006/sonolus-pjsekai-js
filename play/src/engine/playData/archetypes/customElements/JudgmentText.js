import { NormalLayout } from '../../../../../../shared/src/engine/data/utils.js'
import { getZ, layer, skin } from '../../skin.js'
import { archetypes } from './../index.js'

export class JudgmentText extends SpawnableArchetype({
    time: Number,
    judgment: Number,
    accuracy: Number,
}) {
    layout = this.entityMemory(Quad)
    z = this.entityMemory(Number)
    check = this.entityMemory(Boolean)
    combo = this.entityMemory(Number)
    comboCheck = levelMemory(Number)
    initialize() {
        this.z = getZ(layer.judgment, -this.spawnData.time, 0)
    }
    updateParallel() {
        if (this.combo != this.comboCheck) {
            this.despawn = true
            return
        }
        if (time.now >= this.spawnData.time + 0.5) {
            this.despawn = true
            return
        }
        const h = 0.09 * ui.configuration.judgment.scale
        const w = h * 27.3
        const centerX = 0
        const centerY = 0.792
        const s = Math.unlerpClamped(this.spawnData.time, this.spawnData.time + 0.064, time.now)
        const a =
            ui.configuration.judgment.alpha *
            Math.unlerpClamped(this.spawnData.time, this.spawnData.time + 0.064, time.now)
        NormalLayout({
            l: centerX - (w * s) / 2,
            r: centerX + (w * s) / 2,
            t: centerY - (h * s) / 2,
            b: centerY + (h * s) / 2,
        }).copyTo(this.layout)
        switch (this.spawnData.judgment) {
            case Judgment.Perfect:
                skin.sprites.perfect.draw(this.layout, this.z, a)
                break
            case Judgment.Great:
                skin.sprites.great.draw(this.layout, this.z, a)
                break
            case Judgment.Good:
                if (this.spawnData.accuracy >= 0.1083 || this.spawnData.accuracy <= -0.1083)
                    skin.sprites.bad.draw(this.layout, this.z, a)
                else skin.sprites.good.draw(this.layout, this.z, a)
                break
            case Judgment.Miss:
                skin.sprites.miss.draw(this.layout, this.z, a)
                break
        }
    }
    updateSequential() {
        if (this.check) return
        this.check = true
        this.comboCheck += 1
        this.combo = this.comboCheck
    }
    terminate() {
        this.check = false
        this.combo = 0
        this.z = 0
    }
}
