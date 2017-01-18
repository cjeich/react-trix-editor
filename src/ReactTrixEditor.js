import React, { Component, PropTypes } from 'react';
import Trix from 'trix';

class ReactTrixEditor extends Component {

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    onEditor: PropTypes.func,
    onUnMount: PropTypes.func,
    autofocus: PropTypes.bool,
    input: PropTypes.string,
    placeholder: PropTypes.string,
    initialValue: PropTypes.string,
  }

  static defaultProps = {
    autofocus: false,
    input: 'react-trix-editor',
    placeholder: 'Enter text here...',
    onEditor: () => {},
    onUnMount: () => {}
  }

  constructor(props) {
    super(props);
    this.id = Math.random().toString(36);
    this.updateStateValue = this.updateStateValue.bind(this);
  }

  componentDidMount() {
    this.Trix = Trix;
    // Provide editor to callback on initialisation
    document.getElementById(this.id).addEventListener('trix-initialize', () => {
      this.editor = document.getElementById(this.id).editor;
      if (this.props.onEditor) {
        // Pass the editor & node
        this.props.onEditor(this.editor, document.getElementById(this.id), this.Trix);
      }
    });

    document.getElementById(this.id).addEventListener('trix-change', e => this.updateStateValue(e));
  }

  componentWillUnmount() {
   this.props.onUnMount(this.editor);
 }

  updateStateValue({target:{value=''}}) {
    this.props.onChange(value);
  }

  render() {
    const { input, initialValue, placeholder, autofocus } = this.props;

    return (
      <div>
        <input id={input} value={initialValue} type="hidden" name="content" />
        <trix-editor
          id={this.id}
          input={input}
          placeholder={placeholder}
          autofocus={autofocus} />
      </div>
    );
  }
}

export default ReactTrixEditor;
