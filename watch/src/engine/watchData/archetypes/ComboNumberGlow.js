import { NormalLayout } from '../../../../../shared/src/engine/data/utils.js'
import { options } from '../../configuration/options.js'
import { getZ, layer, skin } from '../skin.js'
import { archetypes } from './index.js'
export class ComboNumberGlow extends SpawnableArchetype({}) {
    preprocessOrder = 5
    check = this.entityMemory(Boolean)
    layout = this.entityMemory(Quad)
    z = this.entityMemory(Number)
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
        this.z = getZ(layer.judgment + 1, 0, 0)
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
            const h = 0.13 * ui.configuration.combo.scale * 0.94
            const digitWidth = h * 0.79 * 7
            const centerX = 5.337
            const centerY = 0.585
            // 애니메이션 = s * (원래좌표) + (1 - s) * centerX, s * (원래좌표) + (1 - s) * centerY
            const s =
                0.6 +
                0.4 * Math.ease('Out', 'Cubic', Math.min(1, Math.unlerp(t, t + 0.15, time.now)))
            const a = ui.configuration.combo.alpha * 0.8 * ((Math.cos(time.now * Math.PI) + 1) / 2)
            const digitGap = digitWidth * options.comboDistance
            const totalWidth = digitCount * digitWidth + (digitCount - 1) * digitGap
            const startX = centerX - totalWidth / 2
            if (digitCount === 1) {
                const digitLayout = NormalLayout({
                    l: s * (centerX - digitWidth / 2) + (1 - s) * centerX,
                    r: s * (centerX + digitWidth / 2) + (1 - s) * centerX,
                    t: s * (centerY - h / 2) + (1 - s) * centerY,
                    b: s * (centerY + h / 2) + (1 - s) * centerY,
                })
                this.drawDigit(digits[3], digitLayout, this.z, a)
            } else if (digitCount === 2) {
                // 첫 번째 자리
                const digitLayout0 = NormalLayout({
                    l: s * startX + (1 - s) * centerX,
                    r: s * (startX + digitWidth) + (1 - s) * centerX,
                    t: s * (centerY - h / 2) + (1 - s) * centerY,
                    b: s * (centerY + h / 2) + (1 - s) * centerY,
                })
                this.drawDigit(digits[2], digitLayout0, this.z, a)

                // 두 번째 자리
                const digitLayout1 = NormalLayout({
                    l: s * (startX + digitWidth + digitGap) + (1 - s) * centerX,
                    r: s * (startX + 2 * digitWidth + digitGap) + (1 - s) * centerX,
                    t: s * (centerY - h / 2) + (1 - s) * centerY,
                    b: s * (centerY + h / 2) + (1 - s) * centerY,
                })
                this.drawDigit(digits[3], digitLayout1, this.z, a)
            } else if (digitCount === 3) {
                // 첫 번째 자리
                const digitLayout0 = NormalLayout({
                    l: s * startX + (1 - s) * centerX,
                    r: s * (startX + digitWidth) + (1 - s) * centerX,
                    t: s * (centerY - h / 2) + (1 - s) * centerY,
                    b: s * (centerY + h / 2) + (1 - s) * centerY,
                })
                this.drawDigit(digits[1], digitLayout0, this.z, a)

                // 두 번째 자리
                const digitLayout1 = NormalLayout({
                    l: s * (startX + digitWidth + digitGap) + (1 - s) * centerX,
                    r: s * (startX + 2 * digitWidth + digitGap) + (1 - s) * centerX,
                    t: s * (centerY - h / 2) + (1 - s) * centerY,
                    b: s * (centerY + h / 2) + (1 - s) * centerY,
                })
                this.drawDigit(digits[2], digitLayout1, this.z, a)

                // 세 번째 자리
                const digitLayout2 = NormalLayout({
                    l: s * (startX + 2 * (digitWidth + digitGap)) + (1 - s) * centerX,
                    r: s * (startX + 3 * digitWidth + 2 * digitGap) + (1 - s) * centerX,
                    t: s * (centerY - h / 2) + (1 - s) * centerY,
                    b: s * (centerY + h / 2) + (1 - s) * centerY,
                })
                this.drawDigit(digits[3], digitLayout2, this.z, a)
            } else if (digitCount === 4) {
                // 첫 번째 자리
                const digitLayout0 = NormalLayout({
                    l: s * startX + (1 - s) * centerX,
                    r: s * (startX + digitWidth) + (1 - s) * centerX,
                    t: s * (centerY - h / 2) + (1 - s) * centerY,
                    b: s * (centerY + h / 2) + (1 - s) * centerY,
                })
                this.drawDigit(digits[0], digitLayout0, this.z, a)

                // 두 번째 자리
                const digitLayout1 = NormalLayout({
                    l: s * (startX + digitWidth + digitGap) + (1 - s) * centerX,
                    r: s * (startX + 2 * digitWidth + digitGap) + (1 - s) * centerX,
                    t: s * (centerY - h / 2) + (1 - s) * centerY,
                    b: s * (centerY + h / 2) + (1 - s) * centerY,
                })
                this.drawDigit(digits[1], digitLayout1, this.z, a)

                // 세 번째 자리
                const digitLayout2 = NormalLayout({
                    l: s * (startX + 2 * (digitWidth + digitGap)) + (1 - s) * centerX,
                    r: s * (startX + 3 * digitWidth + 2 * digitGap) + (1 - s) * centerX,
                    t: s * (centerY - h / 2) + (1 - s) * centerY,
                    b: s * (centerY + h / 2) + (1 - s) * centerY,
                })
                this.drawDigit(digits[2], digitLayout2, this.z, a)

                // 네 번째 자리
                const digitLayout3 = NormalLayout({
                    l: s * (startX + 3 * (digitWidth + digitGap)) + (1 - s) * centerX,
                    r: s * (startX + 4 * digitWidth + 3 * digitGap) + (1 - s) * centerX,
                    t: s * (centerY - h / 2) + (1 - s) * centerY,
                    b: s * (centerY + h / 2) + (1 - s) * centerY,
                })
                this.drawDigit(digits[3], digitLayout3, this.z, a)
            }
        }
    }
    drawDigit(digit, layout, z, a) {
        if (!this.customCombo.get(this.head).ap && options.ap) {
            switch (digit) {
                case 0:
                    skin.sprites.glow0.draw(layout, z, a)
                    break
                case 1:
                    skin.sprites.glow1.draw(layout, z, a)
                    break
                case 2:
                    skin.sprites.glow2.draw(layout, z, a)
                    break
                case 3:
                    skin.sprites.glow3.draw(layout, z, a)
                    break
                case 4:
                    skin.sprites.glow4.draw(layout, z, a)
                    break
                case 5:
                    skin.sprites.glow5.draw(layout, z, a)
                    break
                case 6:
                    skin.sprites.glow6.draw(layout, z, a)
                    break
                case 7:
                    skin.sprites.glow7.draw(layout, z, a)
                    break
                case 8:
                    skin.sprites.glow8.draw(layout, z, a)
                    break
                case 9:
                    skin.sprites.glow9.draw(layout, z, a)
                    break
            }
        }
    }
    get head() {
        return archetypes.ComboNumber.searching.get(0).head
    }
}
