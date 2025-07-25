import { lane } from '../../../../../../../../shared/src/engine/data/lane.js'
import { perspectiveLayout } from '../../../../../../../../shared/src/engine/data/utils.js'
import { windows } from '../../../../../../../../shared/src/engine/data/windows.js'
import { buckets } from '../../../../buckets.js'
import { effect } from '../../../../effect.js'
import { particle } from '../../../../particle.js'
import { skin } from '../../../../skin.js'
import { archetypes } from '../../../index.js'
import { SlideStartNote } from './SlideStartNote.js'
export class CriticalSlideStartNote extends SlideStartNote {
    sprites = {
        left: skin.sprites.criticalNoteLeft,
        middle: skin.sprites.criticalNoteMiddle,
        right: skin.sprites.criticalNoteRight,
        fallback: skin.sprites.criticalNoteFallback,
    }
    clips = {
        perfect: effect.clips.normalPerfect,
    }
    effects = {
        circular: particle.effects.criticalSlideCircular,
        circularFallback: particle.effects.criticalNoteCircular,
        linear: particle.effects.criticalSlideLinear,
        linearFallback: particle.effects.criticalNoteLinear,
        slotEffects: particle.effects.slotEffectSlideTapYellow,
    }
    windows = windows.slideStartNote.critical
    bucket = buckets.criticalSlideStartNote
    get slotEffect() {
        return archetypes.CriticalSlotEffect
    }
    get slotGlowEffect() {
        return archetypes.CriticalSlideNoteSlotGlowEffect
    }
    playLaneEffects() {
        if (particle.effects.criticalLane.exists) {
            particle.effects.criticalLane.spawn(
                perspectiveLayout({
                    l: this.import.lane - this.import.size,
                    r: this.import.lane + this.import.size,
                    b: lane.b,
                    t: lane.t,
                }),
                1,
                false,
            )
        } else if (particle.effects.noteLane.exists) {
            particle.effects.noteLane.spawn(
                perspectiveLayout({
                    l: this.import.lane - this.import.size,
                    r: this.import.lane + this.import.size,
                    b: lane.b,
                    t: lane.t,
                }),
                1,
                false,
            )
        } else {
            particle.effects.lane.spawn(
                perspectiveLayout({
                    l: this.import.lane - this.import.size,
                    r: this.import.lane + this.import.size,
                    b: lane.b,
                    t: lane.t,
                }),
                0.3,
                false,
            )
        }
    }
}
