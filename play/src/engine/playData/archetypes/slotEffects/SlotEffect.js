import { perspectiveLayout } from '../../../../../../shared/src/engine/data/utils.js'
import { options } from '../../../configuration/options.js'
import { note } from '../../note.js'
import { getZ, layer } from '../../skin.js'
export class SlotEffect extends SpawnableArchetype({
    startTime: Number,
    lane: Number,
}) {
    endTime = this.entityMemory(Number)
    layout = this.entityMemory(Quad)
    z = this.entityMemory(Number)
    initialize() {
        this.endTime = this.spawnData.startTime + 0.5
        perspectiveLayout({
            l: this.spawnData.lane - 0.5,
            r: this.spawnData.lane + 0.5,
            b: 1 + note.h,
            t: 1 - note.h,
        }).copyTo(this.layout)
        this.z = getZ(layer.slotEffect, -this.spawnData.startTime, -Math.abs(this.spawnData.lane))
    }
    updateParallel() {
        if (time.now >= this.endTime) {
            this.despawn = true
            return
        }
        const baseA = Math.unlerp(this.endTime, this.spawnData.startTime, time.now)
        const a = options.lightweight ? baseA * 0.25 : baseA
        this.sprite.draw(this.layout, this.z, a)
    }
}
