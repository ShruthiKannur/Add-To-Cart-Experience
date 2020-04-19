import React, { PureComponent } from 'react';
import './dialogbox.css';
import '../themes/commonThemes.css';

export default function withDialogBox(WrappedComponent, options) {
  class DialogBox extends PureComponent {
    render() {
      return(
        <div className="mask">
          <div className="box">
            <h5 className="title"> {(options || {}).title || ''} </h5>
            <WrappedComponent {...this.props} />
            <div className="horizontalseperator"> </div>
            <div className="actions">
              <div className="dialogbtnStyle">
                <button className="blueBtn" value="cancel" onClick={(evt) => {
                  this.props.onCancel && this.props.onCancel();
                }}> Cancel </button>
              </div>
              <div className="verticalseperator"> </div>
              <div className="dialogbtnStyle">
                <button className="blueBtn" value = "apply" onClick={(evt) => {
                  this.props.onApply && this.props.onApply();
                }}> Apply </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  return DialogBox;
}
