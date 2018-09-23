import React, { Component } from 'react';
import {
  BLOCK_TYPES,
  HEADER_TYPES,
  BlockStyleButton
} from './BlockStyleButton';
import HeaderStyleDropdown from './HeaderStyleDropdown';

class BlockStyleToolbar extends Component {
  render() {
    const { editorState } = this.props;
    const selection = editorState.getSelection();
    const blockType = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();

    return (
      <div>
        <span className="RichEditor-controls">
          <HeaderStyleDropdown
            headerOptions={HEADER_TYPES}
            active={blockType}
            onToggle={this.props.onToggle}
          />

          {BLOCK_TYPES.map(type => {
            return (
              <BlockStyleButton
                active={type.style === blockType}
                label={type.label}
                onToggle={this.props.onToggle}
                style={type.style}
                key={type.label}
                type={type}
              />
            );
          })}
        </span>
      </div>
    );
  }
}

export default BlockStyleToolbar;
