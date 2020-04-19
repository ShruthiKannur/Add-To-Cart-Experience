import React, { PureComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './searchbox.css';
import event from '../../events.js';
import KeyBoardEnabled from '../KeyBoardEnabled';

export default class SearchBox extends PureComponent {
  constructor() {
    super();
    this.state = {
      searchValue: '',
    }
  }

  handleSearchInput = (val) => {
    this.setState({searchValue: val});
  }

  handleEnterPress = () => {
    event.emit('FILTER_BY_NAME', this.state.searchValue);
  }

  render() {
    return(
      <KeyBoardEnabled onEnterPress={this.handleEnterPress}>
        <div>
          <input type="search" placeholder="Search" className="searchBox__input" value={this.state.searchValue} onInput={(evt) => {
            if (evt.target.value === '') {
              event.emit('FILTER_BY_NAME', '');
            }
            this.handleSearchInput(evt.target.value);
          }}/>
          <label> <FontAwesomeIcon icon={faSearch} size="xs" color="white" onClick={() => {
            event.emit('FILTER_BY_NAME', this.state.searchValue);
          }}/> </label>
        </div>
      </KeyBoardEnabled>
    );
  }
}
