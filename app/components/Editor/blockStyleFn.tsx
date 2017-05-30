import { ALIGNMENT_DATA_KEY } from './ExtendedRichUtils'

const blockStyleFn = (contentBlock) => {
    switch (contentBlock.getType()) {
        case 'blockquote':
            return 'RichEditor-blockquote'
        default:
    }
    const textAlignStyle = contentBlock.getData().get(ALIGNMENT_DATA_KEY);
    switch (textAlignStyle) {
        case 'RIGHT':
            return `text-align-right`
        case 'CENTER':
            return `text-align-center`
        case 'LEFT':
            return `text-align-left`
        default:
            return ''
    }
}

export default blockStyleFn