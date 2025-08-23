import { skin } from '../../../skin.js'
import { ActiveSlideConnector } from './ActiveSlideConnector.js'
export class CriticalActiveSlideConnector extends ActiveSlideConnector {
    sprites = {
        normal: skin.sprites.criticalActiveSlideConnectorNormal,
        fallback: skin.sprites.criticalActiveSlideConnectorFallback,
    }
    get critical() {
        return 0.4
    }
}
