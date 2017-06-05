import * as React from 'react'
import { getDefaultKeyBinding, KeyBindingUtil } from 'draft-js'
const { hasCommandModifier } = KeyBindingUtil

function keyBindingFn(e: React.KeyboardEvent): string {
    if (e.keyCode === 83 /* `S` key */ && hasCommandModifier(e)) {
        return 'editor-save'
    }
    return getDefaultKeyBinding(e)
}

export { keyBindingFn }
