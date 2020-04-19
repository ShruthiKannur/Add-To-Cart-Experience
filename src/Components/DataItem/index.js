import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptop, faHeadphones, faRupeeSign, faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import './dataitem.css';
import '../../themes/commonThemes.css';

export default function DataItem(props) {
  const icon = props.icon === 'faLaptop' ? faLaptop : faHeadphones;
  return (
    <div className={props.mainContainer}>
      <div className={props.titleStyle} style={props.imageStyle}>
        <img src={props.image} width="100%" height="100%"/>
      </div>
      <div style={props.detailContainer}>
        <div className="dataItem__div textCenter">
          <div className="dataItem__div__div"> {props.name} </div>
            <div className={props.detailStyle}>
              <FontAwesomeIcon icon={faRupeeSign} size="xs" color="black"/>
              <label className="dataItem__div__discountedLabel"> {props.price.actual} </label>
              <label className="dataItem__div__actualLabel"> {props.price.display} </label>
              <label className="dataItem__div__discountLabel"> {props.discount}% off </label>
            </div>
        </div>
        {props.children}
      </div>
    </div>
  );
}
