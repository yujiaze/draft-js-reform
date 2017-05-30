import * as React from 'react'
import { EditorState } from 'draft-js'
import { StyleButton } from './base'
import ExtendedRichUtils, { ALIGNMENT_DATA_KEY } from '../ExtendedRichUtils'
import getCurrentlySelectedBlock from '../getCurrentlySelectedBlock'

const TEXT_ALIGN = [
    { label: 'LEFT', style: 'LEFT' },
    { label: 'CENTER', style: 'CENTER' },
    { label: 'RIGHT', style: 'RIGHT' }
]

interface ITextAlignControlProps {
    editorState: EditorState,
    editorSetState: (editorState: EditorState) => void
}

export default class TextAlignControl extends React.Component<ITextAlignControlProps, null> {
    constructor(props) {
        super(props)
    }
    render() {
        const { editorState, editorSetState } = this.props
        const { currentBlock } = getCurrentlySelectedBlock(editorState)
        const blockTextAlign = currentBlock.getData().get(ALIGNMENT_DATA_KEY)
        return (
            <div className="RichEditor-controls">
                {TEXT_ALIGN.map(type =>
                    <StyleButton
                        key={type.label}
                        onToggle={(style) => editorSetState(ExtendedRichUtils.toggleAlignment(editorState, style))}
                        active={type.style === blockTextAlign}
                        label={type.label}
                        style={type.style}
                    />
                )}
            </div>
        )
    }
}