import { skin } from '../../skin.js'
import { SlideConnector } from './SlideConnector.js'
export class NormalSlideConnector extends SlideConnector {
    sprites = {
        normal: skin.sprites.normalSlideConnectorNormal,
        fallback: skin.sprites.normalSlideConnectorFallback,
    }
    get critical() {
        return 0
    }
}
