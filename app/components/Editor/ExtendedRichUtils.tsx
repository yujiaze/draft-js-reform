import { Modifier, EditorState, RichUtils } from 'draft-js'
import * as Immutable from 'immutable'
import getCurrentlySelectedBlock from './getCurrentlySelectedBlock'

export const ALIGNMENTS = {
    CENTER: 'center',
    JUSTIFY: 'justify',
    LEFT: 'left',
    RIGHT: 'right'
}

export const ALIGNMENT_DATA_KEY = 'textAlign'

interface IExtendedRichUtils {
    onTab: typeof RichUtils.onTab,
    handleKeyCommand: typeof RichUtils.handleKeyCommand,
    toggleBlockType: typeof RichUtils.toggleBlockType,
    toggleInlineStyle: typeof RichUtils.toggleInlineStyle,
    toggleAlignment(editorState: EditorState, alignment: 'LEFT' | 'CENTER' | 'RIGHT'): EditorState,
    splitBlock(editorState: EditorState): EditorState
}

const ExtendedRichUtils: IExtendedRichUtils = Object.assign({}, RichUtils, {
    // Largely copied from RichUtils' `toggleBlockType`

    toggleAlignment(editorState: EditorState, alignment: 'LEFT' | 'CENTER' | 'RIGHT'): EditorState {
        const { content, currentBlock, hasAtomicBlock, target } = getCurrentlySelectedBlock(editorState)

        if (hasAtomicBlock) {
            return editorState
        }

        const blockData = currentBlock.getData()
        const alignmentToSet = blockData && blockData.get(ALIGNMENT_DATA_KEY) === alignment ?
            undefined :
            alignment

        return EditorState.push(
            editorState,
            Modifier.mergeBlockData(content, target, Immutable.Map({
                [ALIGNMENT_DATA_KEY]: alignmentToSet
            })),
            'change-block-data'
        )
    },
    /*
	 * An extension of the default split block functionality, originally pulled from
	 * https://github.com/facebook/draft-js/blob/master/src/component/handlers/edit/commands/keyCommandInsertNewline.js
	 *
	 * This version ensures that the text alignment is copied from the previously selected block.
	*/
    splitBlock(editorState: EditorState): EditorState {
        // Original split logic
        const contentState = Modifier.splitBlock(
            editorState.getCurrentContent(),
            editorState.getSelection()
        )
        const splitState = EditorState.push(editorState, contentState, 'split-block')

        // Assign alignment if previous block has alignment. Note that `currentBlock` is the block that was selected
        // before the split.
        const { currentBlock } = getCurrentlySelectedBlock(editorState)
        const alignment = currentBlock.getData().get(ALIGNMENT_DATA_KEY)
        if (alignment) {
            return ExtendedRichUtils.toggleAlignment(splitState, alignment)
        } else {
            return splitState
        }
    }
})

export default ExtendedRichUtils
