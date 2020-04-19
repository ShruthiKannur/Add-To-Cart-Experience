import React, { PureComponent, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRupeeSign, faFilter } from '@fortawesome/free-solid-svg-icons';
import './filter.css';
import '../../themes/commonThemes.css';
import withDialogBox from '../../HOC/withDialogBox.js';
import event from '../../events.js';

export function FilterDialog(props) {
  const [filterValue, setFilterValue] = useState(props.min);
  return (
    <div style={props.custStyle}>
      <div className="flexWithSpace filterDialog__div">
      <label> <FontAwesomeIcon icon={faRupeeSign} size="xs" color="black" /> {filterValue} </label>
      <label> <FontAwesomeIcon icon={faRupeeSign} size="xs" color="black" /> {props.max} </label>
    </div>
      <input type="range" min={100} max={100000} id="costRange" step={100} value={filterValue} className="filterDialog__input" onChange={(evt) => {
        setFilterValue(evt.target.value);
        props.onChange && props.onChange(evt.target.value);
      }}/>
      <div>
        <label className="textCenter"> Price </label>
      </div>
    </div>
  );
}

const FilterDialogBox = withDialogBox(FilterDialog, {title: 'Filter Options'});

export default class Filter extends PureComponent {
  constructor() {
    super();
    this.state = {
      showFilter: false,
    };
    this.selectedOption = 100;
  }

  onChange = (val) => {
    this.selectedOption = Number(val);
  }

  onCancel = () => {
    this.setState({showFilter: false});
  }

  onApply = () => {
    this.setState({showFilter: false});
    event.emit('FILTER_BY_PRICE', {min: this.selectedOption, max: 100000});
  }

  handleClick = () => {
    this.setState({showFilter: true});
  }

  render() {
    const { custStyle = {}, displayIcon = true, custLabelStyle ={} } = this.props;
    return (
      <div className="filter__div flexCenterAlign textCenter" style={custStyle}>
        <label onClick={this.handleClick} style={custLabelStyle}> {displayIcon && <FontAwesomeIcon icon={faFilter} color="black" /> }Filters </label>
        {!displayIcon &&
          <div>
            <FilterDialog onChange={this.onChange} max={100000} min={this.selectedOption} custStyle={{marginTop: 20}}/>
            <div className="dialogbtnStyle">
              <button className="blueBtn filter__apply__button" onClick={this.onApply}> Apply </button>
            </div>
          </div>
        }
        {this.state.showFilter ? <FilterDialogBox onCancel={this.onCancel} onApply={this.onApply} onChange={this.onChange} max={100000} min={this.selectedOption}/> : null}
      </div>
    );
  }
}
