import React, { PureComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import './sort.css';
import '../../themes/commonThemes.css';
import withDialogBox from '../../HOC/withDialogBox.js';
import event from '../../events.js';

export function SearchDialog(props) {
  const { custInputStyle = '', highlight = '' } = props;
  return (
    <ul className="searchDialog__ul displayInRow flexAlignLeft" style={props.custStyle} onChange={(evt) => props.onChange(evt.target.value)}>
      <li className="searchDialog__li">
        <input type="radio" name="selection" id="highToLow" value="highToLow" className={custInputStyle} checked={highlight == 'highToLow' ? true: false}/>
        <label htmlFor="highToLow" style={highlight == 'highToLow' ? {color: 'blue'} : {}}>  Price -- High Low </label>
      </li>
      <li className="searchDialog__li">
        <input type="radio" name="selection" id="lowToHigh" value="lowToHigh" className={custInputStyle} checked={highlight == 'lowToHigh' ? true: false}/>
        <label htmlFor="lowToHigh" style={highlight == 'lowToHigh' ? {color: 'blue'} : {}}>  Price -- Low High </label>
      </li>
      <li className="searchDialog__li">
        <input type="radio" name="selection" id="discount" value="discount" className={custInputStyle} checked={highlight == 'discount' ? true: false}/>
        <label htmlFor="discount" style={highlight == 'discount' ? {color: 'blue'} : {}}>  Discount </label>
      </li>
    </ul>
  );
}

const SearchDialogBox = withDialogBox(SearchDialog, {title: 'Search Options'});

export default class Sort extends PureComponent {
  constructor() {
    super();
    this.state = {
      showOptions: false,
    };
    this.selectedOption = 'highToLow';
  }

  onChange = (val) => {
    console.log('on change');
    const { displayIcon = true } = this.props;
    this.selectedOption = val;
    if (!displayIcon) {
      this.onApply();
    }
    this.forceUpdate();
  }

  onCancel = () => {
    this.setState({showOptions: false});
  }

  onApply = () => {
    this.setState({showOptions: false});
    event.emit('SORT_BY_PRICE', this.selectedOption);
  }

  handleClick = () => {
    this.setState({showOptions: true});
  }

  render() {
    const { custStyle = {}, displayIcon = true, custLabelStyle ={} } = this.props;
    return (
      <div className="sort__div flexCenterAlign textCenter" style={custStyle}>
        <label onClick={this.handleClick} style={custLabelStyle}> {displayIcon && <FontAwesomeIcon icon={faSort} color="black" />} Sort </label>
        {!displayIcon && (
            <SearchDialog onChange={this.onChange} custStyle={{flexDirection: 'row', display: 'inline-flex'}} custInputStyle="searchDialog__input__desktop" highlight={this.selectedOption}/>
        )}
        {this.state.showOptions ? <SearchDialogBox onCancel={this.onCancel} onApply={this.onApply} onChange={this.onChange} highlight={this.selectedOption}/> : null}
      </div>
    );
  }
}
