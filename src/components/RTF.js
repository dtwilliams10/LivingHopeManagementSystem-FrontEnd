import React, { Component } from 'react';
import { EditorState, RichUtils, Editor } from 'draft-js';
import createHighlightPlugin from './plugins/HighlightPlugin';
import BlockStyleToolbar, {
  getBlockStyle
} from './blockStyles/BlockStyleToolbar';

const highlightPlugin = createHighlightPlugin();

class RTF extends Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };

    this.plugins = [highlightPlugin];
  }

  onChange = editorState => {
    this.setState({
      editorState
    });
  };

  handleKeyCommand = command => {
    const newState = RichUtils.handleKeyCommand(
      this.state.editorState,
      command
    );

    if (newState) {
      this.onChange(newState);
      return 'handled';
    }

    return 'not-handled';
  };

  toggleBlocktype = blocktype => {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blocktype));
  };

  onUnderlineClick = () => {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE')
    );
  };

  onBoldClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  };

  onItalicClick = () => {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC')
    );
  };

  render() {
    return (
      <div className="editorContainer">
        <BlockStyleToolbar
          editorState={this.state.editorState}
          onToggle={this.toggleBlocktype}
        />
        <button onClick={this.onUnderlineClick}>U</button>
        <button onClick={this.onBoldClick}>
          <b>B</b>
        </button>
        <button onClick={this.onItalicClick}>
          <em>I</em>
        </button>
        <div className="editors">
          <Editor
            blockStyleFn={getBlockStyle}
            plugins={this.plugins}
            editorState={this.state.editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
          />
        </div>
      </div>
    );
  }
}

export default RTF;
