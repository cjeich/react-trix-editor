import React, { Component } from 'react';
import { render } from 'react-dom';

import ReactTrixEditor from '../../src';

class ReactTrixEditorDemo extends Component {

  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
  }

  state = {
    value: ''
  }

  onChange(value) {
    /*
      Value here is a string that has has HTML tags injected automatically by Trix.
    */
    this.setState({
      value
    });
  }

  render() {

    const testProps = {
      onChange: this.onChange,
      onEditor(editor, _, Trix) {
        console.log(`Editor callback: `, editor);
        console.log(`Trix: `, Trix);
      },
      initialValue: 'Hello World',
      placeholder: 'A placeholder shown when the text editor is empty'
    };

    console.log(`value: ${this.state.value}`);

    return (
      <div>
        <h1>React-Trix-Editor Demo</h1>
        <ReactTrixEditor {...testProps} />
      </div>
    );
  }
}

render(<ReactTrixEditorDemo />, document.querySelector('#demo'));
