import { ComboLabel } from './customElements/ComboLabel.js'
import { ComboNumber } from './customElements/ComboNumber.js'
import { ComboNumberEffect } from './customElements/ComboNumberEffect.js'
import { ComboNumberGlow } from './customElements/ComboNumberGlow.js'
import { Initialization } from './Initialization.js'
import { InputManager } from './InputManager.js'
import { JudgmentAccuracy } from './customElements/JudgmentAccuracy.js'
import { JudgmentText } from './customElements/JudgmentText.js'
import { SimLine } from './SimLine.js'
import { Stage } from './Stage.js'
import { CriticalFlickNote } from './notes/flatNotes/flickNotes/singleFlickNotes/CriticalFlickNote.js'
import { NormalFlickNote } from './notes/flatNotes/flickNotes/singleFlickNotes/NormalFlickNote.js'
import { CriticalSlideEndFlickNote } from './notes/flatNotes/flickNotes/slideEndFlickNotes/CriticalSlideEndFlickNote.js'
import { NormalSlideEndFlickNote } from './notes/flatNotes/flickNotes/slideEndFlickNotes/NormalSlideEndFlickNote.js'
import { CriticalTraceFlickNote } from './notes/flatNotes/flickNotes/traceFlickNotes/CriticalTraceFlickNote.js'
import { NormalTraceFlickNote } from './notes/flatNotes/flickNotes/traceFlickNotes/NormalTraceFlickNote.js'
import { CriticalSlideEndNote } from './notes/flatNotes/slideEndNotes/CriticalSlideEndNote.js'
import { NormalSlideEndNote } from './notes/flatNotes/slideEndNotes/NormalSlideEndNote.js'
import { CriticalSlideStartNote } from './notes/flatNotes/slideStartNotes/CriticalSlideStartNote.js'
import { NormalSlideStartNote } from './notes/flatNotes/slideStartNotes/NormalSlideStartNote.js'
import { CriticalTapNote } from './notes/flatNotes/tapNotes/CriticalTapNote.js'
import { NormalTapNote } from './notes/flatNotes/tapNotes/NormalTapNote.js'
import { CriticalSlideEndTraceNote } from './notes/flatNotes/traceNotes/CriticalSlideEndTraceNote.js'
import { CriticalSlideTraceNote } from './notes/flatNotes/traceNotes/CriticalSlideTraceNote.js'
import { CriticalTraceNote } from './notes/flatNotes/traceNotes/CriticalTraceNote.js'
import { NormalSlideEndTraceNote } from './notes/flatNotes/traceNotes/NormalSlideEndTraceNote.js'
import { NormalSlideTraceNote } from './notes/flatNotes/traceNotes/NormalSlideTraceNote.js'
import { NormalTraceNote } from './notes/flatNotes/traceNotes/NormalTraceNote.js'
import { HiddenSlideTickNote } from './notes/slideTickNotes/HiddenSlideTickNote.js'
import { IgnoredSlideTickNote } from './notes/slideTickNotes/IgnoredSlideTickNote.js'
import { CriticalSlideTickNote } from './notes/slideTickNotes/visibleSlideTickNotes/CriticalSlideTickNote.js'
import { NormalSlideTickNote } from './notes/slideTickNotes/visibleSlideTickNotes/NormalSlideTickNote.js'
import { CriticalAttachedSlideTickNote } from './notes/slideTickNotes/visibleSlideTickNotes/attachedSlideTickNotes/CriticalAttachedSlideTickNote.js'
import { NormalAttachedSlideTickNote } from './notes/slideTickNotes/visibleSlideTickNotes/attachedSlideTickNotes/NormalAttachedSlideTickNote.js'
import { CriticalSlideConnector } from './slideConnectors/CriticalSlideConnector.js'
import { NormalSlideConnector } from './slideConnectors/NormalSlideConnector.js'
import { CriticalActiveSlideConnector } from './slideConnectors/activeSlideConnectors/CriticalActiveSlideConnector.js'
import { NormalActiveSlideConnector } from './slideConnectors/activeSlideConnectors/NormalActiveSlideConnector.js'
import { SlideParticleManager } from './slideConnectors/activeSlideConnectors/SlideParticleManager.js'
import { CriticalSlotEffect } from './slotEffects/CriticalSlotEffect.js'
import { FlickSlotEffect } from './slotEffects/FlickSlotEffect.js'
import { NormalSlotEffect } from './slotEffects/NormalSlotEffect.js'
import { SlideSlotEffect } from './slotEffects/SlideSlotEffect.js'
import { CriticalFlickSlotGlowEffect } from './slotGlowEffects/CriticalFlickSlotGlowEffect.js'
import { CriticalSlideNoteSlotGlowEffect } from './slotGlowEffects/CriticalSlideNoteSlotGlowEffect.js'
import { CriticalSlotGlowEffect } from './slotGlowEffects/CriticalSlotGlowEffect.js'
import { FlickSlotGlowEffect } from './slotGlowEffects/FlickSlotGlowEffect.js'
import { NormalSlotGlowEffect } from './slotGlowEffects/NormalSlotGlowEffect.js'
import { SlideSlotGlowEffect } from './slotGlowEffects/SlideSlotGlowEffect.js'
import { Damage } from './customElements/Damage.js'
import { CriticalSlideSlotEffect } from './slotEffects/CriticalSlideSlotEffect.js'
import { CriticalFlickSlotEffect } from './slotEffects/CriticalFlickSlotEffect.js'
export const archetypes = defineArchetypes({
    Initialization,
    InputManager,
    Stage,
    NormalTapNote,
    CriticalTapNote,
    NormalFlickNote,
    CriticalFlickNote,
    NormalTraceNote,
    CriticalTraceNote,
    NormalTraceFlickNote,
    CriticalTraceFlickNote,
    NormalSlideTraceNote,
    CriticalSlideTraceNote,
    NormalSlideStartNote,
    CriticalSlideStartNote,
    NormalSlideEndNote,
    CriticalSlideEndNote,
    NormalSlideEndTraceNote,
    CriticalSlideEndTraceNote,
    NormalSlideEndFlickNote,
    CriticalSlideEndFlickNote,
    IgnoredSlideTickNote,
    NormalSlideTickNote,
    CriticalSlideTickNote,
    HiddenSlideTickNote,
    NormalAttachedSlideTickNote,
    CriticalAttachedSlideTickNote,
    NormalSlideConnector,
    CriticalSlideConnector,
    NormalActiveSlideConnector,
    CriticalActiveSlideConnector,
    SimLine,
    NormalSlotEffect,
    SlideSlotEffect,
    FlickSlotEffect,
    CriticalSlotEffect,
    CriticalFlickSlotEffect,
    CriticalSlideSlotEffect,
    NormalSlotGlowEffect,
    SlideSlotGlowEffect,
    FlickSlotGlowEffect,
    CriticalSlotGlowEffect,
    CriticalSlideNoteSlotGlowEffect,
    CriticalFlickSlotGlowEffect,
    JudgmentText,
    JudgmentAccuracy,
    ComboNumber,
    ComboNumberGlow,
    ComboNumberEffect,
    ComboLabel,
    SlideParticleManager,
    Damage,
})
