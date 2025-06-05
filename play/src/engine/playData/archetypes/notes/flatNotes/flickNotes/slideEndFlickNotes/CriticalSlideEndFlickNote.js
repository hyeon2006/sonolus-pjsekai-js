import { lane } from '../../../../../../../../shared/src/engine/data/lane.js';
import { perspectiveLayout } from '../../../../../../../../shared/src/engine/data/utils.js';
import { windows } from '../../../../../../../../shared/src/engine/data/windows.js';
import { buckets } from '../../../../buckets.js';
import { effect } from '../../../../effect.js';
import { particle } from '../../../../particle.js';
import { skin } from '../../../../skin.js';
import { archetypes } from '../../../index.js';
import { FlickNote } from './FlickNote.js';
import { SharedLaneEffectUtils } from './SharedLaneEffectUtils.js';
import { options } from '../../../../../configuration/options.js'

export class CriticalSlideEndFlickNote extends FlickNote {
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
    }
    preprocess() {
        super.preprocess();
        const l = this.import.lane - this.import.size;
        const r = this.import.lane + this.import.size;
        const t = this.hitTime
        const laneB = lane.b
        const laneT = lane.t
        archetypes.LaneEffectSpawner.spawn({
            l: l, r: r, t: t, laneB: laneB, laneT: laneT, j: this.import.judgment,
        });
    }
}