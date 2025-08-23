import { lane as _lane } from '../../../../shared/src/engine/data/lane.js'
import { skin } from './skin.js'
export const lane = {
    ..._lane,
    hitbox: {
        l: -7,
        r: 7,
        t: (803 / 850) * 0.6,
        b: 1.5,
    },
}
export const getHitbox = ({ l, r, leniency }) =>
    new Rect({
        l: l - leniency,
        r: r + leniency,
        b: lane.hitbox.b,
        t: lane.hitbox.t,
    }).transform(skin.transform)
