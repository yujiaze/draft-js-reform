import * as React from 'react'

const BLOCK_TYPES = [
    { label: 'H1', style: 'header-one' },
    { label: 'H2', style: 'header-two' },
    { label: 'H3', style: 'header-three' },
    { label: 'H4', style: 'header-four' },
    { label: 'H5', style: 'header-five' },
    { label: 'H6', style: 'header-six' },
    { label: 'Blockquote', style: 'blockquote' },
    { label: 'UL', style: 'unordered-list-item' },
    { label: 'OL', style: 'ordered-list-item' },
    { label: 'Code Block', style: 'code-block' }
]

interface IStyleButtonProps {
    onToggle: (param: any) => void,
    active: boolean,
    style: string
    label: string
}

export class StyleButton extends React.Component<IStyleButtonProps, null> {
    public constructor() {
        super()
        this.onToggle = this.onToggle.bind(this)
    }
    public render() {
        let className = 'RichEditor-styleButton'
        if (this.props.active) {
            className += ' RichEditor-activeButton'
        }
        return (
            <span className={className} onMouseDown={this.onToggle}>
                {this.props.label}
            </span>
        )
    }
    private onToggle(e) {
        e.preventDefault()
        this.props.onToggle(this.props.style)
    }
}

const BlockStyleControls = (props) => {
    const { editorState } = props
    const selection = editorState.getSelection()
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType()

    return (
        <div className="RichEditor-controls">
            {BLOCK_TYPES.map((type) =>
                <StyleButton
                    key={type.label}
                    active={type.style === blockType}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            )}
        </div>
    )
}

export default BlockStyleControls
