import React from 'react';
import { Editor, EditorState } from 'draft-js';
import '../App.css';

function RichTextEditor() {
  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty()
  );

  return (
    <div className="draft-editor-wrapper">
      <Editor editorState={editorState} onChange={setEditorState} />
    </div>
  );
}

export default RichTextEditor;
