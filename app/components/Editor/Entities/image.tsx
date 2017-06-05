import * as React from 'react'
import { EditorState, AtomicBlockUtils, EntityInstance } from 'draft-js'

interface IImageControlProps {
    editorState: EditorState,
    editorSetState: (editorState: EditorState) => void
}

interface IImageControlState {
    showPrompt: boolean
}

export default class ImageControl extends React.Component<IImageControlProps, IImageControlState> {
    public constructor(props: IImageControlProps) {
        super(props)
        this.showPrompt = this.showPrompt.bind(this)
        this.handleUploadFile = this.handleUploadFile.bind(this)
        this.state = {
            showPrompt: false
        }
    }
    public render() {
        return (
            <span className="RichEditor-styleButton" onClick={this.showPrompt}>
                图片
                {
                    this.state.showPrompt &&
                    <input onChange={this.handleUploadFile} type="file" accept="image/jpeg;image/png;image/gif;" />
                }
            </span>
        )
    }
    private showPrompt() {
        this.setState({
            showPrompt: true
        })
    }
    private handleUploadFile(e: React.SyntheticEvent) {
        this.setState({
            showPrompt: false
        })
        const url = URL.createObjectURL((e.target as any).files[0])
        const { editorState, editorSetState } = this.props
        const contentState = editorState.getCurrentContent()
        const contentStateWithEntity = contentState.createEntity(
            'IMAGE',
            'MUTABLE',
            { ENTITY_TYPE: 'IMAGE', src: url }
        )
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
        const newEditorState = EditorState.set(
            editorState,
            { currentContent: contentStateWithEntity }
        )
        editorSetState(AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' '))
    }
}

export const Image = ({ entity }: { entity: EntityInstance }) => {
    const { src } = entity.getData()
    const type = entity.getType()
    return (
        <div>
            <img src={src} alt="" />
        </div>
    )
}
