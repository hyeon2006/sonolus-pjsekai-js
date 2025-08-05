import { options } from '../../../configuration/options.js'
import { getZ, layer } from '../../skin.js'
import { comboNumberLayout } from './comboNumberLayout.js'
export class ComboNumber extends SpawnableArchetype({}) {
    preprocessOrder = 4
    check = this.entityMemory(Boolean)
    z = this.entityMemory(Number)
    z2 = this.entityMemory(Number)
    head = this.entityMemory(Number)
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
    searching = this.defineSharedMemory({
        head: Number,
    })
    initialize() {
        this.z = getZ(layer.judgment, 0, 0)
    }
    spawnTime() {
        return -999999
    }
    despawnTime() {
        return 999999
    }
    updateSequential() {
        this.searching.get(0).head = this.head
    }
    updateParallel() {
        if (time.now <= this.customCombo.get(this.customCombo.get(0).start).time && this.check) {
            this.head = this.customCombo.get(0).start
            this.check = false
        }
        if (time.skip) {
            let ptr = this.customCombo.get(0).start
            const tail = this.customCombo.get(0).tail
            for (let level = 3; level >= 0; level--) {
                while (
                    ptr != tail &&
                    this.customCombo.get(this.customCombo.get(ptr).value.get(level)).time < time.now
                ) {
                    ptr = this.customCombo.get(ptr).value.get(level)
                }
            }
            this.head = ptr
            this.check = true
        }
        while (
            time.now >= this.customCombo.get(this.customCombo.get(this.head).value.get(0)).time &&
            this.head != this.customCombo.get(0).tail
        ) {
            this.head = this.customCombo.get(this.head).value.get(0)
            this.check = true
        }
        if (!options.customCombo || (options.auto && !replay.isReplay)) return
        if (time.now < this.customCombo.get(this.customCombo.get(0).start).time) return
        if (this.customCombo.get(this.head).combo == 0) return
        const c = this.customCombo.get(this.head).combo
        const t = this.customCombo.get(this.head).time
        if (c != 0) {
            const digits = [
                Math.floor(c / 1000) % 10,
                Math.floor(c / 100) % 10,
                Math.floor(c / 10) % 10,
                c % 10,
            ]
            let digitCount = 4
            if (digits[0] === 0) digitCount = 3
            if (digits[0] === 0 && digits[1] === 0) digitCount = 2
            if (digits[0] === 0 && digits[1] === 0 && digits[2] === 0) digitCount = 1
            const h = 0.1222 * ui.configuration.combo.scale
            const digitWidth = h * 0.79 * 7
            const centerX = 5.337
            const centerY = 0.585
            // 애니메이션 = s * (원래좌표) + (1 - s) * centerX, s * (원래좌표) + (1 - s) * centerY
            const s = 0.6 + 0.4 * Math.unlerpClamped(t, t + 0.112, time.now)
            const a = ui.configuration.combo.alpha
            const digitGap = digitWidth * options.comboDistance
            const totalWidth = digitCount * digitWidth + (digitCount - 1) * digitGap
            const startX = centerX - totalWidth / 2
            comboNumberLayout.numberLayout(
                this.head,
                this.customCombo,
                this.z,
                digits,
                digitCount,
                digitWidth,
                digitGap,
                s,
                a,
                h,
                centerX,
                centerY,
                startX,
            )
        }
    }
}
