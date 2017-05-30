import * as Draft from 'draft-js'
import atomicCompRenderer from './atomicCompRenderer'

export default function mediaBlockRenderer(block: Draft.ContentBlock, contentState?: Draft.ContentState) {
    if (block.getType() === 'atomic') {
        return {
            component: atomicCompRenderer,
            editable: false
        }
    }
    return null
}