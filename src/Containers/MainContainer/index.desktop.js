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
      <div className="displayInColumn" style={{height: window.innerHeight}}>
        <div className="maincontainer__desktop__div">
          <Filter custStyle={{marginTop: 20}} displayIcon={false} custLabelStyle={{fontWeight: 'bold', textAlign: 'left'}}/>
        </div>
        <div className="displayInRow maincontainer__desktop__divFullScreen">
          <Sort custStyle={{textAlign: 'left',marginLeft: 10, height: 30, flex: 'none'}} displayIcon={false} custLabelStyle={{fontWeight: 'bold', textAlign: 'left'}}/>
          <div className="horizontalseperator"> </div>
          <DataContainer />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchData: () => dispatch(fetchData()),
})

export default connect(null, mapDispatchToProps)(MainContainer);
