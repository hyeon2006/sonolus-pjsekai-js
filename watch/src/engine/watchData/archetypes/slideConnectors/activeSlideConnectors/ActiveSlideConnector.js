import { perspectiveLayout } from '../../../../../../../shared/src/engine/data/utils.js'
import { options } from '../../../../configuration/options.js'
import { effect } from '../../../effect.js'
import { note } from '../../../note.js'
import { circularEffectLayout, linearEffectLayout, particle } from '../../../particle.js'
import { scaledScreen } from '../../../scaledScreen.js'
import { getZ, layer } from '../../../skin.js'
import { archetypes } from '../../index.js'
import { SlideConnector, VisualType } from '../SlideConnector.js'
export class ActiveSlideConnector extends SlideConnector {
    glowZ = this.entityMemory(Number)
    slideZ = this.entityMemory(Number)
    diamondZ = this.entityMemory(Number)
    preprocess() {
        super.preprocess()
        if (options.sfxEnabled) {
            if (replay.isReplay && !options.autoSFX) {
                this.scheduleReplaySFX()
            } else {
                this.scheduleSFX(this.head.time, this.tail.time)
            }
        }
        if (this.import.endRef === this.import.tailRef)
            archetypes.SlideParticleManager.spawn({
                t: this.tail.time,
                startRef: this.import.startRef,
            })
    }
    updateParallel() {
        super.updateParallel()
        if (time.now < this.head.time) return
        if (this.visual === VisualType.Activated) {
            if (this.shouldScheduleCircularEffect && this.startSharedMemory.circular)
                this.updateCircularEffect()
            if (this.shouldScheduleLinearEffect && this.startSharedMemory.linear)
                this.updateLinearEffect()
        }
        this.renderGlow()
        this.renderSlide()
    }
    updateSequential() {
        if (time.skip) {
            if (this.shouldScheduleCircularEffect) {
                this.destroyCircularEffect()
                this.startSharedMemory.circular = 0
            }
            if (this.shouldScheduleLinearEffect) {
                this.destroyCircularEffect()
                this.startSharedMemory.linear = 0
            }
            this.startSharedMemory.noneMoveLinear = 0
            this.startSharedMemory.slotEffects = 0
        }
        if (time.now < this.head.time) return
        if (this.visual !== VisualType.Activated) {
            if (this.shouldScheduleCircularEffect && this.startSharedMemory.circular) {
                this.destroyCircularEffect()
                this.startSharedMemory.circular = 0
            }
            if (this.shouldScheduleLinearEffect && this.startSharedMemory.linear) {
                this.destroyLinearEffect()
                this.startSharedMemory.linear = 0
            }
        } else {
            if (this.shouldScheduleCircularEffect && !this.startSharedMemory.circular)
                this.spawnCircularEffect()
            if (this.shouldScheduleLinearEffect && !this.startSharedMemory.linear)
                this.spawnLinearEffect()
            if (
                this.shouldPlayNoneMoveLinearEffect &&
                time.scaled > this.startSharedMemory.noneMoveLinear
            )
                this.spawnNoneMoveLinearEffect()
            if (this.shouldPlaySlotEffects && time.scaled > this.startSharedMemory.slotEffects)
                this.spawnSlotEffects()
        }
    }
    terminate() {
        if (this.import.endRef == this.import.tailRef) {
            if (this.shouldScheduleCircularEffect && this.startSharedMemory.circular)
                this.destroyCircularEffect()
            if (this.shouldScheduleLinearEffect && this.startSharedMemory.linear)
                this.destroyLinearEffect()
        }
    }
    get useFallbackSlideSprite() {
        return (
            !this.slideSprites.left.exists ||
            !this.slideSprites.middle.exists ||
            !this.slideSprites.right.exists
        )
    }
    get useFallbackGlowSprite() {
        return !this.slideGlowSprite.glow.exists
    }
    get useFallbackClip() {
        return !this.clips.hold.exists
    }
    get shouldScheduleCircularEffect() {
        return options.noteEffectEnabled && this.effects.circular.exists
    }
    get shouldScheduleLinearEffect() {
        return options.noteEffectEnabled && this.effects.linear.exists
    }
    get shouldPlayNoneMoveLinearEffect() {
        return options.noteEffectEnabled && this.effects.noneMoveLinear.exists
    }
    get shouldPlaySlotEffects() {
        return options.slotEffectEnabled && this.effects.slotEffects.exists
    }
    globalInitialize() {
        super.globalInitialize()
        this.glowZ = getZ(
            layer.connectorSlotGlowEffect,
            -this.start.time,
            -Math.abs(this.startImport.lane) + this.critical,
        )
        this.slideZ = getZ(
            layer.note.slide,
            -this.start.time,
            -Math.abs(this.startImport.lane) + this.critical,
        )
        this.diamondZ = getZ(
            layer.note.tick,
            -this.start.time,
            -Math.abs(this.startImport.lane) + this.critical,
        )
    }
    getAlpha() {
        return this.visual === VisualType.NotActivated
            ? options.connectorAlpha * 0.5
            : options.connectorAlpha
    }
    renderGlow() {
        if (time.now < this.start.time) return
        if (time.now > this.end.time) return
        if (!options.slotEffectEnabled) return
        if (this.visual !== VisualType.Activated) return
        const s = this.getScale(time.scaled)
        const l = this.getL(s)
        const r = this.getR(s)
        const dynamicHeight =
            options.version == 0
                ? 3 + (Math.cos((time.now - this.start.time) * 8 * Math.PI) + 1) / 2
                : 4 * ((Math.sin((time.now - this.start.time) * 2.5 * Math.PI) + 1) / 2)
        const h = dynamicHeight * options.slotEffectSize * scaledScreen.wToH
        const shear = 1 + 0.25 * (dynamicHeight / 4.25) * options.slotEffectSize
        const w = options.version == 0 ? 0.035 * Math.abs(l - r) + 0.08 : 0
        const quadLike = {
            x1: l - w,
            x2: l * shear - w,
            x3: r * shear + w,
            x4: r + w,
            y1: 1,
            y2: 1 - h,
            y3: 1 - h,
            y4: 1,
        }
        if (this.useFallbackGlowSprite)
            this.slideGlowSprite.fallback.draw(
                quadLike,
                this.glowZ,
                options.version == 0
                    ? Math.min(1, (time.now - this.start.time) * 4) *
                          (options.lightweight ? 0.15 : 0.3)
                    : Math.sin((time.now - this.start.time) * 2.5 * Math.PI) *
                          (options.lightweight ? 0.15 : 0.3),
            )
        else
            this.slideGlowSprite.glow.draw(
                quadLike,
                this.glowZ,
                options.version == 0
                    ? Math.min(1, (time.now - this.start.time) * 4) *
                          (options.lightweight ? 0.15 : 0.3)
                    : Math.sin((time.now - this.start.time) * 2.5 * Math.PI) *
                          (options.lightweight ? 0.15 : 0.3),
            )
    }
    renderSlide() {
        if (time.now > this.end.time + time.delta) return
        const s = this.getScale(time.scaled)
        const l = this.getL(s)
        const r = this.getR(s)
        const b = 1 + note.h
        const t = 1 - note.h
        if (this.useFallbackSlideSprite) {
            this.slideSprites.fallback.draw(perspectiveLayout({ l, r, b, t }), this.slideZ, 1)
        } else {
            const ml = l + 0.25
            const mr = r - 0.25
            const w = note.h / scaledScreen.wToH
            const lane = this.getLane(s)
            if (
                entityInfos.get(this.import.startRef).archetype ===
                archetypes.IgnoredSlideTickNote.index
            ) {
                //None
            } else if (
                entityInfos.get(this.import.startRef).archetype ===
                    archetypes.NormalSlideStartNote.index ||
                entityInfos.get(this.import.startRef).archetype ===
                    archetypes.CriticalSlideStartNote.index
            ) {
                this.slideSprites.left.draw(perspectiveLayout({ l, r: ml, b, t }), this.slideZ, 1)
                this.slideSprites.middle.draw(
                    perspectiveLayout({ l: ml, r: mr, b, t }),
                    this.slideZ,
                    1,
                )
                this.slideSprites.right.draw(perspectiveLayout({ l: mr, r, b, t }), this.slideZ, 1)
            } else {
                this.slideSprites.tleft.draw(perspectiveLayout({ l, r: ml, b, t }), this.slideZ, 1)
                this.slideSprites.tmiddle.draw(
                    perspectiveLayout({ l: ml, r: mr, b, t }),
                    this.slideZ,
                    1,
                )
                this.slideSprites.tright.draw(perspectiveLayout({ l: mr, r, b, t }), this.slideZ, 1)
                this.slideSprites.tdiamond.draw(
                    new Rect({
                        l: lane - w,
                        r: lane + w,
                        b: 1 + note.h,
                        t: 1 - note.h,
                    }),
                    this.diamondZ,
                    1,
                )
            }
        }
    }
    scheduleReplaySFX() {
        if (this.import.startRef !== this.import.headRef) return
        let key = -999999
        while (true) {
            const startTime = streams.getNextKey(this.import.startRef, key)
            if (startTime === key) break
            const endTime = streams.getValue(this.import.startRef, startTime)
            this.scheduleSFX(startTime, Math.min(endTime, this.end.time))
            key = startTime
        }
    }
    scheduleSFX(startTime, endTime) {
        const id =
            'fallback' in this.clips && this.useFallbackClip
                ? this.clips.fallback.scheduleLoop(startTime)
                : this.clips.hold.scheduleLoop(startTime)
        effect.clips.scheduleStopLoop(id, endTime)
    }
    spawnCircularEffect() {
        this.startSharedMemory.circular = this.effects.circular.spawn(new Quad(), 1, true)
    }
    updateCircularEffect() {
        const s = this.getScale(time.scaled)
        const lane = this.getLane(s)
        particle.effects.move(
            this.startSharedMemory.circular,
            circularEffectLayout({
                lane,
                w: 3.5,
                h: 2.1,
            }),
        )
    }
    destroyCircularEffect() {
        particle.effects.destroy(this.startSharedMemory.circular)
    }
    spawnLinearEffect() {
        this.startSharedMemory.linear = this.effects.linear.spawn(new Quad(), 1, true)
    }
    updateLinearEffect() {
        const s = this.getScale(time.scaled)
        const lane = this.getLane(s)
        particle.effects.move(
            this.startSharedMemory.linear,
            linearEffectLayout({
                lane,
                shear: 0,
            }),
        )
    }
    destroyLinearEffect() {
        particle.effects.destroy(this.startSharedMemory.linear)
    }
    spawnNoneMoveLinearEffect() {
        this.startSharedMemory.noneMoveLinear = timeScaleChanges.at(time.now + 0.1).scaledTime
        const s = this.getScale(time.scaled)
        const lane = this.getLane(s)
        this.effects.noneMoveLinear.spawn(
            linearEffectLayout({
                lane,
                shear: 0,
            }),
            0.5,
            false,
        )
    }
    spawnSlotEffects() {
        this.startSharedMemory.slotEffects = timeScaleChanges.at(time.now + 0.2).scaledTime
        const s = this.getScale(time.scaled)
        const l = this.getL(s)
        const r = this.getR(s)
        for (let i = l + 0.5; i < r - 0.5; i++) {
            this.effects.slotEffects.spawn(
                linearEffectLayout({
                    lane: i,
                    shear: 0,
                }),
                0.5,
                false,
            )
        }
    }
}
