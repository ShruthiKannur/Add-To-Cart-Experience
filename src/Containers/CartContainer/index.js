import React, { PureComponent } from 'react';
import './cartcontainer.css';
import '../../themes/commonThemes.css';
import themes from '../../themes';
import DataItem from '../../Components/DataItem';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRupeeSign, faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

export class CartContainer extends PureComponent {
  render() {
    const { data = [], decreaseCartItem, increaseCartItem, cartItem, priceData } = this.props;

    const dataItems = data.map((ele, i) => {
      const inputValue = cartItem[ele.name] || 0;
      const keyExtractor = `cartContainer-${i}`;
      return (
        <div key={keyExtractor} className="cartContainer__divSectionTwo__div">
          <DataItem {...ele}
            detailStyle="cartContainer__dataItem__detail"
            mainContainer="displayInColumn"
            detailContainer={themes.detailContainer}
            titleStyle="cartContainer__dataItem__title"
          >
            <div className="displayInColumn flexAlignLeft cartContainer__dataItem__div">
              <FontAwesomeIcon icon={faMinusCircle} size="sm" onClick={() => decreaseCartItem(ele.name)}/>
              <input type="number" className="cartContainer__dataItem__input" readOnly value={inputValue}/>
              <FontAwesomeIcon icon={faPlusCircle} size="sm" onClick={() => increaseCartItem(ele.name)}/>
            </div>
            <div className="cartContainer__dataItem__divButton">
              <button value="Remove" label="Remove" className="cartContainer__dataItem__button"> Remove </button>
            </div>
          </DataItem>
        </div>
    )});

    return (
      <div className="displayInColumn flexWrap">
        <div className="cartContainer__sectionOne__div">
          {dataItems}
        </div>
        <div className="cartContainer__divSectionTwo">
          <div className="cartContainer__divSectionTwo__div cartContainer__divSectionTwo__divFullWidth">
            <h3 className="cartContainer__divSectionTwo__h3"> PRICE DETAILS </h3>
            <div className="horizontalseperator cartContainer__divSectionTwo__divSeperator"> </div>
            <div className="flexWithSpace">
              <span className="cartContainer__divSectionTwo__span"> Price ({priceData.totalItems} item)  : </span>
              <span className="cartContainer__divSectionTwo__span"> <FontAwesomeIcon icon={faRupeeSign} size="xs" /> {priceData.actualCost} </span>
            </div>
            <div className="flexWithSpace">
              <span className="cartContainer__divSectionTwo__span"> Discount  : </span>
              <span className="cartContainer__divSectionTwo__span"> <FontAwesomeIcon icon={faRupeeSign} size="xs" /> {priceData.actualCost - priceData.totalCost} </span>
            </div>
            <div className="horizontalseperator"> </div>
            <div className="flexWithSpace">
              <span className="cartContainer__divSectionTwo__span cartContainer__divSectionTwo__spanBold"> Total Payable </span>
              <span className="cartContainer__divSectionTwo__span cartContainer__divSectionTwo__spanBold"> <FontAwesomeIcon icon={faRupeeSign} size="sm" /> {priceData.totalCost} </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownprops) => {
  const cartItems = state.cartItems;
  const keys = Object.keys(cartItems);
  const cartData = [];
  const priceData = {
    totalItems: cartItems.length,
    actualCost: 0,
    totalCost: 0,
  };
  keys.forEach((key) => {
    state.data.find((item) => {
      if (item.name == key) {
        cartData.push(item);
        priceData.actualCost = priceData.actualCost + (item.price.display * cartItems[key]);
        priceData.totalCost = priceData.totalCost + (item.price.actual * cartItems[key]);
      }
    })
  });
  return{
    data: cartData,
    cartItem: state.cartItems,
    priceData,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    decreaseCartItem: (name) => dispatch({type: 'DECREASE_CART_ITEM', name}),
    increaseCartItem: (name) => dispatch({type: 'INCREASE_CART_ITEM', name}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartContainer);
