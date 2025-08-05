import { ease } from '../../../../../../shared/src/engine/data/EaseType.js'
import { approach } from '../../../../../../shared/src/engine/data/note.js'
import { options } from '../../../configuration/options.js'
import { note } from '../../note.js'
import { getZ, layer } from '../../skin.js'
import { archetypes } from '../index.js'
export var VisualType
;(function (VisualType) {
    VisualType[(VisualType['Waiting'] = 0)] = 'Waiting'
    VisualType[(VisualType['NotActivated'] = 1)] = 'NotActivated'
    VisualType[(VisualType['Activated'] = 2)] = 'Activated'
})(VisualType || (VisualType = {}))
export class SlideConnector extends Archetype {
    import = this.defineImport({
        startRef: { name: 'start', type: Number },
        endRef: { name: 'end', type: Number },
        headRef: { name: 'head', type: Number },
        tailRef: { name: 'tail', type: Number },
        ease: { name: 'ease', type: DataType },
        lane: { name: 'lane', type: Number },
    })
    initialized = this.entityMemory(Boolean)
    start = this.entityMemory({
        time: Number,
        scaledTime: Number,
    })
    end = this.entityMemory({
        time: Number,
        scaledTime: Number,
    })
    head = this.entityMemory({
        time: Number,
        lane: Number,
        scaledTime: Number,
        l: Number,
        r: Number,
    })
    tail = this.entityMemory({
        time: Number,
        lane: Number,
        scaledTime: Number,
        l: Number,
        r: Number,
    })
    visualTime = this.entityMemory({
        min: Number,
    })
    hiddenTime = this.entityMemory(Number)
    z = this.entityMemory(Number)
    visual = this.entityMemory(DataType)
    preprocess() {
        this.end.time = bpmChanges.at(this.endImport.beat).time
        this.end.scaledTime = timeScaleChanges.at(this.end.time).scaledTime
        this.head.time = bpmChanges.at(this.headImport.beat).time
        this.head.scaledTime = timeScaleChanges.at(this.head.time).scaledTime
        this.tail.time = bpmChanges.at(this.tailImport.beat).time
        this.tail.scaledTime = timeScaleChanges.at(this.tail.time).scaledTime
        this.visualTime.min = this.head.scaledTime - note.duration
    }
    spawnTime() {
        return this.visualTime.min
    }
    despawnTime() {
        return this.tail.scaledTime
    }
    initialize() {
        if (this.initialized) return
        this.initialized = true
        this.globalInitialize()
    }
    updateParallel() {
        this.updateVisualType()
        this.renderConnector()
    }
    get startSharedMemory() {
        return this.slideStartNote.sharedMemory.get(this.import.startRef)
    }
    get startImport() {
        return this.slideStartNote.import.get(this.import.startRef)
    }
    get endImport() {
        return this.slideStartNote.import.get(this.import.endRef)
    }
    get headImport() {
        return this.slideStartNote.import.get(this.import.headRef)
    }
    get tailImport() {
        return this.slideStartNote.import.get(this.import.tailRef)
    }
    get useFallbackSprite() {
        return !this.sprites.normal.exists || !this.sprites.active.exists
    }
    globalInitialize() {
        this.start.time = bpmChanges.at(this.startImport.beat).time
        this.start.scaledTime = timeScaleChanges.at(this.start.time).scaledTime
        this.head.lane = this.headImport.lane
        this.head.l = this.head.lane - this.headImport.size
        this.head.r = this.head.lane + this.headImport.size
        this.tail.lane = this.tailImport.lane
        this.tail.l = this.tail.lane - this.tailImport.size
        this.tail.r = this.tail.lane + this.tailImport.size
        if (options.hidden > 0)
            this.hiddenTime = this.tail.scaledTime - note.duration * options.hidden
        if (
            entityInfos.get(this.import.startRef).archetype ===
                archetypes.IgnoredSlideTickNote.index ||
            entityInfos.get(this.import.endRef).archetype === archetypes.IgnoredSlideTickNote.index
        ) {
            this.z = getZ(layer.note.connectorS, -this.start.time, -Math.abs(this.startImport.lane))
        } else {
            this.z = getZ(layer.note.connector, -this.start.time, -Math.abs(this.startImport.lane))
        }
    }
    updateVisualType() {
        if (!replay.isReplay) {
            this.visual = time.now >= this.start.time ? VisualType.Activated : VisualType.Waiting
            return
        }
        const startTime = streams.getPreviousKey(this.import.startRef, time.now)
        if (startTime < time.now) {
            const endTime = streams.getValue(this.import.startRef, startTime)
            if (time.now < endTime) {
                this.visual = VisualType.Activated
                return
            }
        }
        this.visual =
            time.now >= this.start.time + this.slideStartNote.windows.good.max + input.offset
                ? VisualType.NotActivated
                : VisualType.Waiting
    }
    renderConnector() {
        if (options.hidden > 0 && time.scaled > this.hiddenTime) return
        if (time.now > this.end.time + time.delta) return
        const hiddenDuration = options.hidden > 0 ? note.duration * options.hidden : 0
        const visibleTime = {
            min: Math.max(
                this.head.scaledTime,
                time.now > this.head.time
                    ? time.scaled + hiddenDuration
                    : time.scaled - note.duration * 1.5,
            ),
            max: Math.min(this.tail.scaledTime, time.scaled + note.duration),
        }
        for (let i = 0; i < 10; i++) {
            const scaledTime = {
                min: Math.lerp(visibleTime.min, visibleTime.max, i / 10),
                max: Math.lerp(visibleTime.min, visibleTime.max, (i + 1) / 10),
            }
            const s = {
                min: this.getScale(scaledTime.min),
                max: this.getScale(scaledTime.max),
            }
            const y = {
                min: approach(scaledTime.min - note.duration, scaledTime.min, time.scaled),
                max: approach(scaledTime.max - note.duration, scaledTime.max, time.scaled),
            }
            const layout = {
                x1: this.getL(s.min) * y.min,
                x2: this.getL(s.max) * y.max,
                x3: this.getR(s.max) * y.max,
                x4: this.getR(s.min) * y.min,
                y1: y.min,
                y2: y.max,
                y3: y.max,
                y4: y.min,
            }
            let alpha = 0
            if (
                (entityInfos.get(this.info.index).archetype ==
                    archetypes.CriticalSlideConnector.index &&
                    entityInfos.get(this.info.index).archetype !=
                        archetypes.CriticalActiveSlideConnector.index) ||
                (entityInfos.get(this.info.index).archetype ==
                    archetypes.NormalSlideConnector.index &&
                    entityInfos.get(this.info.index).archetype !=
                        archetypes.NormalActiveSlideConnector.index)
            )
                alpha = options.guideAlpha
            else alpha = options.connectorAlpha
            const a =
                this.getAlpha(this.start.scaledTime, this.end.scaledTime, scaledTime.min) * alpha
            if (this.useFallbackSprite) {
                this.sprites.fallback.draw(layout, this.z, a)
            } else if (options.connectorAnimation && this.visual === VisualType.Activated) {
                const normalA = (Math.cos((time.now - this.start.time) * 2 * Math.PI) + 1) / 2
                this.sprites.normal.draw(layout, this.z, a * Math.ease('Out', 'Quad', normalA))
                this.sprites.active.draw(layout, this.z, a * 0.9 * (1 - normalA))
            } else {
                this.sprites.normal.draw(layout, this.z, a)
            }
        }
    }
    getAlpha(a, b, x) {
        return Math.remap(a, b, 0.575, 0.075, x)
    }
    getScale(scaledTime) {
        return this.ease(Math.unlerpClamped(this.head.scaledTime, this.tail.scaledTime, scaledTime))
    }
    ease(s) {
        return ease(this.import.ease, s)
    }
    getLane(scale) {
        return Math.lerp(this.head.lane, this.tail.lane, scale)
    }
    getL(scale) {
        return Math.lerp(this.head.l, this.tail.l, scale)
    }
    getR(scale) {
        return Math.lerp(this.head.r, this.tail.r, scale)
    }
}
