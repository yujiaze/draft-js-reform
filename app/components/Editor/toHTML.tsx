import { stateToHTML } from 'draft-js-export-html'

let options = {
    // inlineStyles: {
    //     // Override default element (`strong`).
    //     BOLD: { element: 'b' },
    //     ITALIC: {
    //         // Add custom attributes. You can also use React-style `className`.
    //         attributes: { class: 'foo' },
    //         // Use camel-case. Units (`px`) will be added where necessary.
    //         style: { fontSize: 12 }
    //     },
    //     // Use a custom inline style. Default element is `span`.
    //     RED: { style: { color: '#900' } },
    // },
    // blockRenderers: {
    //     atomic: (block) => {
    //         let data = block.getData()
    //         if (data.get('foo') === 'bar') {
    //             return '<div>' + escape(block.getText()) + '</div>'
    //         }
    //     },
    // },
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