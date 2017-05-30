import { Editor, EditorState, DefaultDraftBlockRenderMap } from 'draft-js'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as Immutable from 'immutable'
import { keyBindingFn } from './keyBindings'
import blockStyleFn from './blockStyleFn'
import toHTML from './toHTML'
import ExtendedRichUtils from './ExtendedRichUtils'
import BlockStyleControls from './Blocks/base'
import InlineStyleControls from './InlineStyles/base'
import TextAlignControl from './Blocks/textAlign'
import ImageControl from './Entities/image'
import inlineStyleMap from './InlineStyles/override'
import mediaBlockRenderer from './Entities/blockRendererFn'

class RichEditor extends React.Component<any, any> {
    constructor(props) {
        super(props)
        this.state = { editorState: EditorState.createEmpty() }
        this.focus = this.focus.bind(this)
        this.onChange = this.onChange.bind(this)
        this.handleKeyCommand = this.handleKeyCommand.bind(this)
        this.onTab = this.onTab.bind(this)
        this.toggleBlockType = this.toggleBlockType.bind(this)
        this.toggleInlineStyle = this.toggleInlineStyle.bind(this)
        this.editorSetState = this.editorSetState.bind(this)
    }
    focus() {
        (this.refs.editor as HTMLElement).focus()
    }
    onChange(editorState) {
        this.setState({ editorState })
    }
    handleKeyCommand(command) {
        const { editorState } = this.state
        const newState = command == 'split-block' ? ExtendedRichUtils.splitBlock(editorState) : ExtendedRichUtils.handleKeyCommand(editorState, command)
        if (newState) {
            this.onChange(newState)
            return 'handled'
        }
        return 'not-handled'
    }
    onTab(e) {
        const maxDepth = 4
        this.onChange(ExtendedRichUtils.onTab(e, this.state.editorState, maxDepth))
    }
    toggleBlockType(blockType) {
        this.onChange(
            ExtendedRichUtils.toggleBlockType(
                this.state.editorState,
                blockType
            )
        )
    }
    toggleInlineStyle(inlineStyle) {
        this.onChange(
            ExtendedRichUtils.toggleInlineStyle(
                this.state.editorState,
                inlineStyle
            )
        )
    }
    editorSetState(editorState: EditorState) {
        this.setState({ editorState })
    }
    render() {
        const { editorState } = this.state

        // If the user changes block type before entering any text, we can
        // either style the placeholder or hide it. Let's just hide it now.
        let className = 'RichEditor-editor'
        var contentState = editorState.getCurrentContent()
        if (!contentState.hasText()) {
            if (contentState.getBlockMap().first().getType() !== 'unstyled') {
                className += ' RichEditor-hidePlaceholder'
            }
        }
        return (
            <div className="RichEditor-root">
                <TextAlignControl editorState={editorState} editorSetState={this.editorSetState} />
                <BlockStyleControls
                    editorState={editorState}
                    onToggle={this.toggleBlockType}
                />
                <InlineStyleControls
                    editorState={editorState}
                    onToggle={this.toggleInlineStyle}
                />
                <ImageControl editorState={editorState} editorSetState={this.editorSetState} />
                <div className={className} onClick={this.focus}>
                    <Editor
                        blockStyleFn={blockStyleFn}
                        blockRendererFn={mediaBlockRenderer}
                        customStyleMap={inlineStyleMap}
                        editorState={editorState}
                        handleKeyCommand={this.handleKeyCommand}
                        onChange={this.onChange}
                        onTab={this.onTab}
                        placeholder="Tell a story..."
                        ref="editor"
                        spellCheck={true}
                    />
                </div>
                <textarea style={{ width: '500px', height: '200px', fontSize: '15px' }} value={toHTML(contentState)} />
            </div>
        )
    }
}


ReactDOM.render(
    <RichEditor />,
    document.getElementById('app')
)