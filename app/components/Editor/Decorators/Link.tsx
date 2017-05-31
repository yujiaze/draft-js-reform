import * as React from 'react'
import { EditorState, RichUtils, ContentBlock } from 'draft-js'

interface ILinkControlProps {
    editorState: EditorState,
    editorSetState: (editorState: EditorState) => void
}

interface ILinkControlState {
    showPrompt: boolean,
    urlValue: string
}

export class LinkControl extends React.Component<ILinkControlProps, ILinkControlState> {
    constructor(props) {
        super(props)
        this.state = {
            showPrompt: false,
            urlValue: ''
        }
        this.promptForLink = this.promptForLink.bind(this)
        this.confirmLink = this.confirmLink.bind(this)
        this.handleInputUrl = this.handleInputUrl.bind(this)
    }
    promptForLink(e) {
        const { editorState } = this.props
        e.preventDefault()
        const selection = editorState.getSelection()
        if (!selection.isCollapsed()) {
            const contentState = editorState.getCurrentContent()
            const startKey = editorState.getSelection().getStartKey()
            const startOffset = editorState.getSelection().getStartOffset()
            const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey)
            const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset)

            let url = ''
            if (linkKey) {
                const linkInstance = contentState.getEntity(linkKey)
                url = linkInstance.getData().url
            }

            this.setState({
                showPrompt: true,
                urlValue: url,
            }, () => {
                setTimeout(() => (this.refs.url as HTMLInputElement).focus(), 0)
            })
        }
    }
    confirmLink(e) {
        e.preventDefault()
        const { editorState, editorSetState } = this.props
        const { urlValue } = this.state
        const contentState = editorState.getCurrentContent()
        const contentStateWithEntity = contentState.createEntity(
            'LINK',
            'MUTABLE',
            { url: urlValue }
        )
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
        const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity })
        editorSetState(RichUtils.toggleLink(
            newEditorState,
            newEditorState.getSelection(),
            entityKey
        ))
        this.setState({
            showPrompt: false,
            urlValue: '',
        })
    }
    handleInputUrl(e) {
        e.preventDefault()
        this.setState({
            ...this.state,
            urlValue: e.target.value,
        })
    }
    _removeLink(e) {
        e.preventDefault()
        const { editorState } = this.props
        const selection = editorState.getSelection()
        if (!selection.isCollapsed()) {
            this.props.editorSetState(RichUtils.toggleLink(editorState, selection, null))
        }
    }
    render() {
        return (
            <span className="RichEditor-styleButton" onClick={this.promptForLink}>
                🔗
               {
                    this.state.showPrompt &&
                    <div>
                        <label>链接地址</label><input type="text" ref="url" value={this.state.urlValue} onChange={this.handleInputUrl} onBlur={this.confirmLink} />
                    </div>
                }
            </span>
        )
    }
}

const findLinkEntities = (contentBlock: ContentBlock, callback, contentState): void => {
    contentBlock.findEntityRanges(
        (character) => {
            const entityKey = character.getEntity()
            return (
                entityKey !== null &&
                contentState.getEntity(entityKey).getType() === 'LINK'
            )
        },
        callback
    )
}
const Link = (props) => {
    const { url } = props.contentState.getEntity(props.entityKey).getData()
    return (
        <a href={url} target="_blank">
            {props.children}
        </a>
    )
}

export const linkStrategy = {
    strategy: findLinkEntities,
    component: Link
}