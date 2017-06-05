import * as React from 'react'
import { EditorState, Modifier, RichUtils } from 'draft-js'

const COLORS = [
  { label: 'Red', style: 'red' },
  { label: 'Orange', style: 'orange' },
  { label: 'Yellow', style: 'yellow' },
  { label: 'Green', style: 'green' },
  { label: 'Blue', style: 'blue' },
  { label: 'Indigo', style: 'indigo' },
  { label: 'Violet', style: 'violet' },
]

// This object provides the styling information for our custom color styles.
export const COLOR_STYLE = {
  red: {
    color: 'rgba(255, 0, 0, 1.0)',
  },
  orange: {
    color: 'rgba(255, 127, 0, 1.0)',
  },
  yellow: {
    color: 'rgba(180, 180, 0, 1.0)',
  },
  green: {
    color: 'rgba(0, 180, 0, 1.0)',
  },
  blue: {
    color: 'rgba(0, 0, 255, 1.0)',
  },
  indigo: {
    color: 'rgba(75, 0, 130, 1.0)',
  },
  violet: {
    color: 'rgba(127, 0, 255, 1.0)',
  },
}

interface IColorControlProps {
  editorState: EditorState,
  editorSetState: (editorState: EditorState) => void
}

interface IColorControlState {
  showPropmt: boolean
}

export default class ColorControl extends React.Component<IColorControlProps, IColorControlState> {
  constructor(props) {
    super(props)
    this.state = {
      showPropmt: false
    }
    this.toggleColor = this.toggleColor.bind(this)
    this.handleSelectColor = this.handleSelectColor.bind(this)
  }
  public render() {
    return (
      <span className="RichEditor-styleButton" onClick={this.handleSelectColor}>
        颜色
        {
          this.state.showPropmt &&
          <div>
            {/* tslint:disable-next-line jsx-no-lambda */}
            {COLORS.map((c) => <button key={c.label} onClick={() => this.toggleColor(c.style)}>{c.label}</button>)}
          </div>
        }
      </span>
    )
  }
  private toggleColor(toggledColor) {
    const { editorState, editorSetState } = this.props
    const selection = editorState.getSelection()

    // Let's just allow one color at a time. Turn off all active colors.
    const nextContentState = Object.keys(COLOR_STYLE)
      .reduce((contentState, color) => {
        return Modifier.removeInlineStyle(contentState, selection, color)
      }, editorState.getCurrentContent())

    let nextEditorState = EditorState.push(
      editorState,
      nextContentState,
      'change-inline-style'
    )

    const currentStyle = editorState.getCurrentInlineStyle()

    // Unset style override for current color.
    if (selection.isCollapsed()) {
      nextEditorState = currentStyle.reduce((state, color) => {
        return RichUtils.toggleInlineStyle(state, color)
      }, nextEditorState)
    }

    // If the color is being toggled on, apply it.
    if (!currentStyle.has(toggledColor)) {
      nextEditorState = RichUtils.toggleInlineStyle(
        nextEditorState,
        toggledColor
      )
    }

    this.setState({
      showPropmt: false
    })

    editorSetState(nextEditorState)
  }
  private handleSelectColor() {
    this.setState({
      showPropmt: true
    })
  }
}
