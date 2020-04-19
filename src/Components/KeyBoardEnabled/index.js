import React, { PureComponent } from 'react';

export default class KeyBoardEnabled extends PureComponent {
  render() {
    return (
    <div onKeyUp={(key) => {
      if (key.keyCode == 13) {
        this.props.onEnterPress && this.props.onEnterPress();
      }
    }}>
      {this.props.children}
    </div>)
  }
}
