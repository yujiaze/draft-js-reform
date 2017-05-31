import { CompositeDecorator } from 'draft-js'
import { linkStrategy, LinkControl } from './Link'

export default new CompositeDecorator([
    linkStrategy
])

export {
    LinkControl
}