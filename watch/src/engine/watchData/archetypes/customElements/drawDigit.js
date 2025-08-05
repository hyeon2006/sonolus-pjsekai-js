import { skin } from '../../skin'
import { options } from '../../../configuration/options'
export const drawDigit = {
    drawDigit(head, customCombo, digit, layout, z, a) {
        if (customCombo.get(head).ap || !options.ap) {
            switch (digit) {
                case 0:
                    skin.sprites.c0.draw(layout, z, a)
                    break
                case 1:
                    skin.sprites.c1.draw(layout, z, a)
                    break
                case 2:
                    skin.sprites.c2.draw(layout, z, a)
                    break
                case 3:
                    skin.sprites.c3.draw(layout, z, a)
                    break
                case 4:
                    skin.sprites.c4.draw(layout, z, a)
                    break
                case 5:
                    skin.sprites.c5.draw(layout, z, a)
                    break
                case 6:
                    skin.sprites.c6.draw(layout, z, a)
                    break
                case 7:
                    skin.sprites.c7.draw(layout, z, a)
                    break
                case 8:
                    skin.sprites.c8.draw(layout, z, a)
                    break
                case 9:
                    skin.sprites.c9.draw(layout, z, a)
                    break
            }
        } else {
            switch (digit) {
                case 0:
                    skin.sprites.ap0.draw(layout, z, a)
                    break
                case 1:
                    skin.sprites.ap1.draw(layout, z, a)
                    break
                case 2:
                    skin.sprites.ap2.draw(layout, z, a)
                    break
                case 3:
                    skin.sprites.ap3.draw(layout, z, a)
                    break
                case 4:
                    skin.sprites.ap4.draw(layout, z, a)
                    break
                case 5:
                    skin.sprites.ap5.draw(layout, z, a)
                    break
                case 6:
                    skin.sprites.ap6.draw(layout, z, a)
                    break
                case 7:
                    skin.sprites.ap7.draw(layout, z, a)
                    break
                case 8:
                    skin.sprites.ap8.draw(layout, z, a)
                    break
                case 9:
                    skin.sprites.ap9.draw(layout, z, a)
                    break
            }
        }
    },
    drawAp(head, customCombo, digit, layout, z, a) {
        if (!customCombo.get(head).ap && options.ap) {
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
    },
}
