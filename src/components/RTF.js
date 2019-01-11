import React, { Component } from 'react';
import {
  EditorState,
  RichUtils,
  Editor,
  convertToRaw,
  convertFromRaw
} from 'draft-js';
import debounce from 'lodash/debounce';

class RTF extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    fetch('https://lhmsapi.homeserver.dtwilliams10.com/api/systemreport')
      .then(val => val.json())
      .then(rawContent => {
        if (rawContent) {
          this.setState({
            editorState: EditorState.createWithContent(
              convertFromRaw(rawContent)
            )
          });
        } else {
          this.setState({ editorState: EditorState.createEmpty() });
        }
      });
  }

  onChange = editorState => {
    const contentState = editorState.getCurrentContent();
    console.log('content state', convertToRaw(contentState));
    this.setState({ editorState });
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

  onToggleCode = () => {
    this.onChange(RichUtils.toggleCode(this.state.editorState));
  };

  onToggleUnderline = () => {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE')
    );
  };

  render() {
    if (!this.state.editorState) {
      return <h3 className="loading">Laoding...</h3>;
    }
    return (
      <div>
        <button onClick={this.onUnderlineClick}>Underline</button>
        <button onClick={this.onToggleCode}>Code Block</button>
        <Editor
          editorState={this.state.editorState}
          handleKeyCommand={this.handleKeyCommand}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

export default RTF;
