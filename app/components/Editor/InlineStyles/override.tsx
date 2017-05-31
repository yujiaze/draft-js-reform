import { COLOR_STYLE } from './colors'

export default {
    // Custom overrides for "code" style.
    CODE: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 2,
    },
    ...COLOR_STYLE
}
