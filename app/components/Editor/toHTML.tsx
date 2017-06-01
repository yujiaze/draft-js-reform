import { stateToHTML, Options } from 'draft-js-export-html'
import { COLOR_STYLE } from './InlineStyles/colors'

let colorStyle = Object.keys(COLOR_STYLE).reduce(((prev, cur) => {
    prev[cur] = {
        style: {
            ...COLOR_STYLE[cur]
        }
    }
    return prev
}), {})

let options: Options = {
    inlineStyles: {
        // // Override default element (`strong`).
        // BOLD: { element: 'b' },
        // ITALIC: {
        //     // Add custom attributes. You can also use React-style `className`.
        //     attributes: { class: 'foo' },
        //     // Use camel-case. Units (`px`) will be added where necessary.
        //     style: { fontSize: 12 }
        // },
        // // Use a custom inline style. Default element is `span`.
        // RED: { style: { color: '#900' } },
        ...colorStyle
    },
    blockRenderers: {
        atomic: (block) => {
            let data = block.getData()
            if (data.get('foo') === 'bar') {
                return `<div></div>`
            }
        },
    },
    entityStyleFn(entity) { //IMAGE ENTITY IS UNABLE/UNNECESSARY TO CUSTOMIZE
        switch (entity.getType()) {
            default:
                return {}
        }
    },
    blockStyleFn(block) {
        if (block.getData().get('textAlign')) {
            return {
                style: {
                    textAlign: block.getData().get('textAlign').toLowerCase()
                },
                attributes: ''
            }
        }
    }
}

export default (contentState) => stateToHTML(contentState, options)