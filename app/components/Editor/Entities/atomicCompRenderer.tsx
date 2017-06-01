import * as Draft from 'draft-js'
import { Image } from './Image'

interface IAtomicCompRendererProps {
    contentState: Draft.ContentState,
    block: Draft.ContentBlock
}

export default function atomicCompRenderer(props: IAtomicCompRendererProps) {
    const entity = props.contentState.getEntity(
        props.block.getEntityAt(0)
    )
    const { ENTITY_TYPE } = entity.getData()
    
    switch (ENTITY_TYPE) {
        case 'IMAGE':
            return <Image entity={entity} />
        default:
            return null
    }
}