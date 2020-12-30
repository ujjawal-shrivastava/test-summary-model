import React, { Component } from 'react';
import { EditorState,convertFromHTML,ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


export default class TextEditor extends Component {
  
  constructor(props)
  {
    super(props);
    const contentBlock = convertFromHTML(this.props.Main_Data);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock);
      const editorState = EditorState.createWithContent(contentState);
      this.state = {
        editorState,
      };
    }
  }

  onEditorStateChange = (editorState) => {    
    this.setState({
        editorState,
    });
    this.props.HandleFetch(this.state.editorState.getCurrentContent().getPlainText());
  };

  render() {
    const { editorState } = this.state;
    return (
      <div className="editor">
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={this.onEditorStateChange}
          toolbar={{
            options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign',
            'history'],
          }}
        />
      </div>
    );
  }
}