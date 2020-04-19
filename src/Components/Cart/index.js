import React, { PureComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';

/*
export default class Cart extends PureComponent {
  render() {
    const history = useHistory();
    return (
      <FontAwesomeIcon icon={faShoppingCart} size="xs" color="white" onClick={() => {
        window.open("#/Cart", '_self');
      }}/>
    );
  }
}
*/

export default function Cart(props) {
  const history = useHistory();
  return (
    <FontAwesomeIcon icon={faShoppingCart} size="1x" color="white" onClick={() => {
      history.push('/Cart');
    }}/>
  )
}
