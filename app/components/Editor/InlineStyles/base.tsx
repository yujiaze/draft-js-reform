import * as React from 'react'
import { EditorState } from 'draft-js'
import { StyleButton } from '../Blocks/base'

const INLINE_STYLES = [
    { label: 'Bold', style: 'BOLD' },
    { label: 'Italic', style: 'ITALIC' },
    { label: 'Underline', style: 'UNDERLINE' },
    { label: 'Monospace', style: 'CODE' },
]

const InlineStyleControls = (props: { editorState: EditorState, onToggle: (param: any) => void }): JSX.Element => {
    const currentStyle = props.editorState.getCurrentInlineStyle()
    return (
        <div className="RichEditor-controls">
            {INLINE_STYLES.map((type) =>
                <StyleButton
                    key={type.label}
                    active={currentStyle.has(type.style)}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            )}
        </div>
    )
}

export default InlineStyleControls
