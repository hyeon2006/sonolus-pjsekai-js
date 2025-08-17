import { note } from '../../../../../note.js'
import { scaledScreen } from '../../../../../scaledScreen.js'
import { getZ, layer } from '../../../../../skin.js'
import { FlickNote } from '../FlickNote.js'
export class TraceFlickNote extends FlickNote {
    render() {
        const { time, pos } = super.render()
        const z = getZ(layer.note.tick, -time, -Math.abs(this.import.lane))
        const b = -note.h
        const t = note.h
        if (!this.useFallbackSprites) {
            const w = note.h / scaledScreen.wToH
            const l = this.import.lane - w
            const r = this.import.lane + w
            this.sprites.diamond.draw(new Rect({ l, r, b, t }).add(pos), z, 1)
        }
        return { time, pos }
    }
    get useFallbackSprites() {
        return (
            !this.sprites.left.exists ||
            !this.sprites.middle.exists ||
            !this.sprites.right.exists ||
            !this.sprites.diamond.exists
        )
    }
}
