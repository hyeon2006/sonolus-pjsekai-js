import { SlideConnector } from '../SlideConnector.js'
import { options } from '../../../../configuration/options.js'
export class ActiveSlideConnector extends SlideConnector {
    getAlpha() {
        return options.connectorAlpha
    }
}
