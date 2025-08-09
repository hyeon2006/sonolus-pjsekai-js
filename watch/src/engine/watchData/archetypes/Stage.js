import { lane } from '../../../../../shared/src/engine/data/lane.js'
import { perspectiveLayout, NormalLayout } from '../../../../../shared/src/engine/data/utils.js'
import { options } from '../../configuration/options.js'
import { effect, sfxDistance } from '../effect.js'
import { note } from '../note.js'
import { particle } from '../particle.js'
import { scaledScreen } from '../scaledScreen.js'
import { layer, skin } from '../skin.js'
import { archetypes } from './index.js'
import { merge } from '../merge.js'
export class Stage extends Archetype {
    preprocessOrder = 3
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
    ap = this.entityMemory(Boolean)
    cache = this.entityMemory(Tuple(32, Number))
    spawnTime() {
        return -999999
    }
    despawnTime() {
        return 999999
    }
    updateParallel() {
        if (this.useFallbackStage) {
            this.drawFallbackStage()
        } else {
            this.drawSekaiStage()
        }
        this.drawStageCover()
        this.playEffects()
        if (!replay.isReplay && options.customAuto && !options.hideCustom) this.drawAutoLive()
    }
    get useFallbackStage() {
        return !skin.sprites.sekaiStage.exists
    }
    drawAutoLive() {
        const a = 0.8 * ((Math.cos(time.now * Math.PI) + 1) / 2)
        const h = 0.04
        const w = h * 32.55
        const x = (6.272801 * screen.aspectRatio) / 2.045
        const y = 1.159181
        skin.sprites.autoLive.draw(
            NormalLayout({
                l: x - w,
                r: x + w,
                t: y - h,
                b: y + h,
            }),
            layer.judgment,
            a,
        )
    }
    playEffects() {
        if (!replay.isReplay) return
        for (let l = -6; l < 6; l++) {
            let key = streams.getNextKey(l, time.now - time.delta)
            if (key === time.now - time.delta) continue
            if (key < time.now) if (options.laneEffectEnabled) this.playEmptyLaneEffects(l)
        }
    }
    playEmptyLaneEffects(l) {
        particle.effects.lane.spawn(
            perspectiveLayout({ l, r: l + 1, b: lane.b, t: lane.t }),
            0.3,
            false,
        )
    }
    drawSekaiStage() {
        const w = ((2048 / 1420) * 12) / 2
        const h = 1176 / 850
        const layout = new Rect({ l: -w, r: w, t: lane.t, b: lane.t + h })
        skin.sprites.sekaiStage.draw(layout, layer.stage, !options.showLane ? 0 : 1)
        skin.sprites.sekaiStageCover.draw(
            layout,
            layer.stage - 0.01,
            !options.showLane ? 0 : options.laneAlpha,
        )
    }
    drawFallbackStage() {
        skin.sprites.stageLeftBorder.draw(
            perspectiveLayout({ l: -6.5, r: -6, b: lane.b, t: lane.t }),
            layer.stage,
            !options.showLane ? 0 : 1,
        )
        skin.sprites.stageRightBorder.draw(
            perspectiveLayout({ l: 6, r: 6.5, b: lane.b, t: lane.t }),
            layer.stage,
            !options.showLane ? 0 : 1,
        )
        for (let i = 0; i < 6; i++) {
            skin.sprites.lane.draw(
                perspectiveLayout({ l: i * 2 - 6, r: i * 2 - 4, b: lane.b, t: lane.t }),
                layer.stage,
                !options.showLane ? 0 : 1,
            )
        }
        skin.sprites.judgmentLine.draw(
            perspectiveLayout({ l: -6, r: 6, b: 1 + note.h, t: 1 - note.h }),
            layer.judgmentLine,
            !options.showLane ? 0 : 1,
        )
    }
    drawStageCover() {
        if (options.stageCover <= 0) return
        skin.sprites.cover.draw(
            new Rect({
                l: scaledScreen.l,
                r: scaledScreen.r,
                t: scaledScreen.t,
                b: Math.lerp(lane.t, 1, options.stageCover),
            }),
            layer.cover,
            !options.showLane ? 0 : 1,
        )
    }
    preprocess() {
        if (options.sfxEnabled && replay.isReplay) {
            for (let l = -6; l < 6; l++) {
                let key = -999999
                while (true) {
                    const newKey = streams.getNextKey(l, key)
                    if (key == newKey) break
                    effect.clips.stage.schedule(newKey, sfxDistance)
                    key = newKey
                }
            }
        }
        if (options.hideCustom) return
        archetypes.ComboNumber.spawn({})
        if (options.customDamage && replay.isReplay) archetypes.Damage.spawn({})
        if (options.customJudgment) {
            archetypes.JudgmentText.spawn({})
            if (options.fastLate && replay.isReplay) {
                archetypes.JudgmentAccuracy.spawn({})
            }
        }
        if (options.customCombo && (!options.auto || replay.isReplay)) {
            archetypes.ComboLabel.spawn({})
            archetypes.ComboNumberGlow.spawn({})
            archetypes.ComboNumberEffect.spawn({})
        }
        merge.searching(this.cache, this.customCombo, this.ap)
    }
}
