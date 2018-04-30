import React, { Component } from 'react';
import ReactQuill from 'react-quill'; // ES6

class PreviewTextArea extends Component {
  constructor(props) {
    super(props);

    this.deltaDeltaValue = this.props.deltaDeltaValue
  }
  
  render() {
    return (
      <div>
        <div>
          <ReactQuill
            // theme={'snow'} // pass false to use minimal theme
            defaultValue={this.deltaDeltaValue}
            readOnly={true}
            modules={{"toolbar": false}}
          />
        </div>
      </div>

    );
  }
}


export default PreviewTextArea;
