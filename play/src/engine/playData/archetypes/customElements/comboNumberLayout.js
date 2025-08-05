import { NormalLayout } from '../../../../../../shared/src/engine/data/utils'
import { drawDigit } from './drawDigit'
export const comboNumberLayout = {
    numberLayout(
        ap,
        z,
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
        glow,
    ) {
        if (digitCount === 1) {
            const digitLayout0 = NormalLayout({
                l: s * (centerX - digitWidth / 2) + (1 - s) * centerX,
                r: s * (centerX + digitWidth / 2) + (1 - s) * centerX,
                t: s * (centerY - h / 2) + (1 - s) * centerY,
                b: s * (centerY + h / 2) + (1 - s) * centerY,
            })
            glow
                ? drawDigit.drawAp(ap, digits[3], digitLayout0, z, a)
                : drawDigit.drawDigit(ap, digits[3], digitLayout0, z, a)
        } else if (digitCount === 2) {
            // 첫 번째 자리
            const digitLayout0 = NormalLayout({
                l: s * startX + (1 - s) * centerX,
                r: s * (startX + digitWidth) + (1 - s) * centerX,
                t: s * (centerY - h / 2) + (1 - s) * centerY,
                b: s * (centerY + h / 2) + (1 - s) * centerY,
            })
            glow
                ? drawDigit.drawAp(ap, digits[2], digitLayout0, z, a)
                : drawDigit.drawDigit(ap, digits[2], digitLayout0, z, a)
            // 두 번째 자리
            const digitLayout1 = NormalLayout({
                l: s * (startX + digitWidth + digitGap) + (1 - s) * centerX,
                r: s * (startX + 2 * digitWidth + digitGap) + (1 - s) * centerX,
                t: s * (centerY - h / 2) + (1 - s) * centerY,
                b: s * (centerY + h / 2) + (1 - s) * centerY,
            })
            glow
                ? drawDigit.drawAp(ap, digits[3], digitLayout1, z, a)
                : drawDigit.drawDigit(ap, digits[3], digitLayout1, z, a)
        } else if (digitCount === 3) {
            // 첫 번째 자리
            const digitLayout0 = NormalLayout({
                l: s * startX + (1 - s) * centerX,
                r: s * (startX + digitWidth) + (1 - s) * centerX,
                t: s * (centerY - h / 2) + (1 - s) * centerY,
                b: s * (centerY + h / 2) + (1 - s) * centerY,
            })
            glow
                ? drawDigit.drawAp(ap, digits[1], digitLayout0, z, a)
                : drawDigit.drawDigit(ap, digits[1], digitLayout0, z, a)
            // 두 번째 자리
            const digitLayout1 = NormalLayout({
                l: s * (startX + digitWidth + digitGap) + (1 - s) * centerX,
                r: s * (startX + 2 * digitWidth + digitGap) + (1 - s) * centerX,
                t: s * (centerY - h / 2) + (1 - s) * centerY,
                b: s * (centerY + h / 2) + (1 - s) * centerY,
            })
            glow
                ? drawDigit.drawAp(ap, digits[2], digitLayout1, z, a)
                : drawDigit.drawDigit(ap, digits[2], digitLayout1, z, a)
            // 세 번째 자리
            const digitLayout2 = NormalLayout({
                l: s * (startX + 2 * (digitWidth + digitGap)) + (1 - s) * centerX,
                r: s * (startX + 3 * digitWidth + 2 * digitGap) + (1 - s) * centerX,
                t: s * (centerY - h / 2) + (1 - s) * centerY,
                b: s * (centerY + h / 2) + (1 - s) * centerY,
            })
            glow
                ? drawDigit.drawAp(ap, digits[3], digitLayout2, z, a)
                : drawDigit.drawDigit(ap, digits[3], digitLayout2, z, a)
        } else if (digitCount === 4) {
            // 첫 번째 자리
            const digitLayout0 = NormalLayout({
                l: s * startX + (1 - s) * centerX,
                r: s * (startX + digitWidth) + (1 - s) * centerX,
                t: s * (centerY - h / 2) + (1 - s) * centerY,
                b: s * (centerY + h / 2) + (1 - s) * centerY,
            })
            glow
                ? drawDigit.drawAp(ap, digits[0], digitLayout0, z, a)
                : drawDigit.drawDigit(ap, digits[0], digitLayout0, z, a)
            // 두 번째 자리
            const digitLayout1 = NormalLayout({
                l: s * (startX + digitWidth + digitGap) + (1 - s) * centerX,
                r: s * (startX + 2 * digitWidth + digitGap) + (1 - s) * centerX,
                t: s * (centerY - h / 2) + (1 - s) * centerY,
                b: s * (centerY + h / 2) + (1 - s) * centerY,
            })
            glow
                ? drawDigit.drawAp(ap, digits[1], digitLayout1, z, a)
                : drawDigit.drawDigit(ap, digits[1], digitLayout1, z, a)
            // 세 번째 자리
            const digitLayout2 = NormalLayout({
                l: s * (startX + 2 * (digitWidth + digitGap)) + (1 - s) * centerX,
                r: s * (startX + 3 * digitWidth + 2 * digitGap) + (1 - s) * centerX,
                t: s * (centerY - h / 2) + (1 - s) * centerY,
                b: s * (centerY + h / 2) + (1 - s) * centerY,
            })
            glow
                ? drawDigit.drawAp(ap, digits[2], digitLayout2, z, a)
                : drawDigit.drawDigit(ap, digits[2], digitLayout2, z, a)
            // 네 번째 자리
            const digitLayout3 = NormalLayout({
                l: s * (startX + 3 * (digitWidth + digitGap)) + (1 - s) * centerX,
                r: s * (startX + 4 * digitWidth + 3 * digitGap) + (1 - s) * centerX,
                t: s * (centerY - h / 2) + (1 - s) * centerY,
                b: s * (centerY + h / 2) + (1 - s) * centerY,
            })
            glow
                ? drawDigit.drawAp(ap, digits[3], digitLayout3, z, a)
                : drawDigit.drawDigit(ap, digits[3], digitLayout3, z, a)
        }
    },
}
