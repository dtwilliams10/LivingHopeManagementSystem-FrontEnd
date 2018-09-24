import React, { Component } from 'react';
import BlockStyleButton from './BlockStyleButton';
import HeaderStyleDropdown from './HeaderStyleDropdown';

export const BLOCK_TYPES = [
  { key: 1, label: ' “ ” ', style: 'blockquote' },
  { key: 2, label: 'UL', style: 'unordered-list-item' },
  { key: 3, label: 'OL', style: 'ordered-list-item' },
  { key: 4, label: '{ }', style: 'code-block' }
];
export const HEADER_TYPES = [
  { key: 1, label: 'H1', style: 'header-one' },
  { key: 2, label: 'H2', style: 'header-two' },
  { key: 3, label: 'H3', style: 'header-three' },
  { key: 4, label: 'H4', style: 'header-four' },
  { key: 5, label: 'H5', style: 'header-five' },
  { key: 6, label: 'H6', style: 'header-six' }
];

export function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote':
      return 'RichEditor-blockquote';
    default:
      return null;
  }
}

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
