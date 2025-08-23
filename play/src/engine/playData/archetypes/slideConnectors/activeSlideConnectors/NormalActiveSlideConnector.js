import { effect } from '../../../effect.js'
import { particle } from '../../../particle.js'
import { skin } from '../../../skin.js'
import { archetypes } from '../../index.js'
import { ActiveSlideConnector } from './ActiveSlideConnector.js'
export class NormalActiveSlideConnector extends ActiveSlideConnector {
    sprites = {
        normal: skin.sprites.normalActiveSlideConnectorNormal,
        active: skin.sprites.normalActiveSlideConnectorActive,
        fallback: skin.sprites.normalActiveSlideConnectorFallback,
    }
    slideGlowSprite = {
        glow: skin.sprites.normalSlideConnectorSlotGlow,
        fallback: skin.sprites.slideSlotGlow,
    }
    slideSprites = {
        left: skin.sprites.slideNoteLeft,
        middle: skin.sprites.slideNoteMiddle,
        right: skin.sprites.slideNoteRight,
        fallback: skin.sprites.slideNoteFallback,
        tleft: skin.sprites.normalTraceNoteLeft,
        tmiddle: skin.sprites.normalTraceNoteMiddle,
        tright: skin.sprites.normalTraceNoteRight,
        tdiamond: skin.sprites.normalTraceNoteDiamond,
    }
    clips = {
        hold: effect.clips.normalHold,
        fallback: effect.clips.normalHold,
    }
    effects = {
        circular: particle.effects.normalSlideConnectorCircular,
        linear: particle.effects.normalSlideConnectorLinear,
        noneMoveLinear: particle.effects.normalSlideConnectorNoneMoveLinear,
        slotEffects: particle.effects.slotEffectNormalSlideConnector,
    }
    get slideStartNote() {
        return archetypes.NormalSlideStartNote
    }
    get critical() {
        return 0
    }
}
