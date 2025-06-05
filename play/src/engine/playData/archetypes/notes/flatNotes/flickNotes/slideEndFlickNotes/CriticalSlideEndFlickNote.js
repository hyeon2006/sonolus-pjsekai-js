import { perspectiveLayout } from '../../../../../../../../../shared/src/engine/data/utils.js';
import { windows } from '../../../../../../../../../shared/src/engine/data/windows.js';
import { buckets } from '../../../../../buckets.js';
import { effect } from '../../../../../effect.js';
import { lane } from '../../../../../lane.js';
import { particle } from '../../../../../particle.js';
import { skin } from '../../../../../skin.js';
import { archetypes } from '../../../../index.js';
import { SlideEndFlickNote } from './SlideEndFlickNote.js';
import { SharedLaneEffectUtils } from '../SharedLaneEffectUtils.js';
export class CriticalSlideEndFlickNote extends SlideEndFlickNote {
    sprites = {
        left: skin.sprites.criticalNoteLeft,
        middle: skin.sprites.criticalNoteMiddle,
        right: skin.sprites.criticalNoteRight,
        fallback: skin.sprites.criticalNoteEndFallback,
    };
    clips = {
        perfect: effect.clips.criticalFlick,
        fallback: effect.clips.flickPerfect,
    };
    effects = {
        circular: particle.effects.criticalFlickNoteCircular,
        circularFallback: particle.effects.criticalNoteCircular,
        linear: particle.effects.criticalFlickNoteLinear,
        linearFallback: particle.effects.criticalNoteLinear,
        slotEffects: particle.effects.slotEffectFlickYellow,
    };
    arrowSprites = {
        up: [
            skin.sprites.criticalArrowUp1,
            skin.sprites.criticalArrowUp2,
            skin.sprites.criticalArrowUp3,
            skin.sprites.criticalArrowUp4,
            skin.sprites.criticalArrowUp5,
            skin.sprites.criticalArrowUp6,
        ],
        left: [
            skin.sprites.criticalArrowLeft1,
            skin.sprites.criticalArrowLeft2,
            skin.sprites.criticalArrowLeft3,
            skin.sprites.criticalArrowLeft4,
            skin.sprites.criticalArrowLeft5,
            skin.sprites.criticalArrowLeft6,
        ],
        fallback: skin.sprites.criticalArrowFallback,
    };
    directionalEffect = particle.effects.criticalNoteDirectional;
    windows = windows.slideEndFlickNote.critical;
    bucket = buckets.criticalSlideEndFlickNote;
    get slotEffect() {
        return archetypes.CriticalSlotEffect;
    }
    get slotGlowEffect() {
        return archetypes.CriticalSlotGlowEffect;
    }
    playLaneEffects() {
        if (particle.effects.criticalFlickLane.exists) {
            this.check = true;
        }
        else {
            particle.effects.lane.spawn(perspectiveLayout({
                l: this.import.lane - this.import.size,
                r: this.import.lane + this.import.size,
                b: lane.b,
                t: lane.t,
            }), 0.3, false);
        }
    }
    touch() {
        super.touch();
        if (!this.check) return
        SharedLaneEffectUtils.playAndHandleLaneEffect(this, this.laneE);
    }
}
