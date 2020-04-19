import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import './maincontainer.css';
import '../../themes/commonThemes.css';
import Sort from '../../Components/Sort';
import Filter from '../../Components/Filter';
import { fetchData } from './action.js';
import DataContainer from '../DataContainer';

export class MainContainer extends PureComponent {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    return (
      <div>
        <div className="mainContainer__div displayInColumn">
          <Sort />
          <Filter />
        </div>
        <DataContainer />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchData: () => dispatch(fetchData()),
})

export default connect(null, mapDispatchToProps)(MainContainer);
