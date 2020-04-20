import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import DataItem from '../../Components/DataItem';
import './datacontainer.css';
import '../../themes/commonThemes.css';
import event from '../../events.js';
import theme from '../../themes';

export class DataContainer extends PureComponent {
  constructor() {
    super();
    this.state = {
      filterByName: null,
      sortByPrice: 'highToLow',
      applyFilter: false,
      filterByPrice: {
        max: 100,
        min: 100000,
      }
    }
  }

  componentDidMount() {
    event.on('FILTER_BY_NAME', (data) => {
      this.setState({filterByName: data});
    });
    event.on('SORT_BY_PRICE', (data) => {
      this.setState({sortByPrice: data});
    });
    event.on('FILTER_BY_PRICE', (data) => {
      this.setState({applyFilter: true, filterByPrice: data});
    });
  }

  addToCart = (element) => {
    this.props.addToCart(element.name);
  };

  getElement = (ele, i) => {
    const keyExtractor = `dataContainer-${i}`;
    return (
      <div key={keyExtractor} className="dataContainer__div__div" style={theme.dataContainer}>
        <DataItem {...ele}
          mainContainer="dataContainer__dataItem__main"
          detailStyle="dataContainer__dataItem__detail"
        //  detailContainer={{textAlign: 'center'}}
          titleStyle={{}}
          imageStyle={theme.imageStyle}
        >
          <div className="textCenter dataContainer__dataItem__div">
            <button label="Add to Cart" className="buttonStyle" onClick={() => this.addToCart(ele)}> Add to Cart </button>
          </div>
        </DataItem>
      </div>
    )
  };

  mergeData = (arr, l, m, r) => {
    let i, j, k;
    let n1 = m - l + 1;
    let n2 =  r - m;
    let left = [];
    let right = [];

    for (i = 0; i < n1; i++) {
      left[i] = arr[l + i];
    }
    for (j = 0; j < n2; j++) {
      right[j] = arr[m + 1+ j];
    }

    i = 0;
    j = 0;
    k = l;

    while (i < n1 && j < n2) {
      let leftItem;
      let rightItem;

      if (this.state.sortByPrice == 'highToLow' || this.state.sortByPrice == 'lowToHigh') {
        leftItem = left[i].price.actual;
        rightItem = right[j].price.actual;
      } else if (this.state.sortByPrice == 'discount') {
        leftItem = left[i].discount;
        rightItem = right[j].discount;
      } else {}

      if (leftItem <= rightItem) {
        arr[k] = left[i];
        i++;
      }
      else {
        arr[k] = right[j];
        j++;
      }
      k++;
    }
    while (i < n1) {
      arr[k] = left[i];
      i++;
      k++;
    }
    while (j < n2) {
      arr[k] = right[j];
      j++;
      k++;
    }
  }

  sort = (arr, l, r) => {
    if (l < r) {
      const m = Math.floor(l+(r-l)/2);
      this.sort(arr, l, m);
      this.sort(arr, m+1, r);
      this.mergeData(arr, l, m, r);
    }
  }

  render() {
    const { data = [] } = this.props;
    const dataItems = [];

    if (this.state.sortByPrice) {
      this.sort(data, 0, data.length - 1);
      this.state.sortByPrice === 'highToLow' && data.reverse();
    }

    data.forEach((ele, i) => {
      if(this.state.filterByName && ele.name && ele.name.toLowerCase().includes(this.state.filterByName.toLowerCase())) {
        dataItems.push(this.getElement(ele, i));
      }
      if (this.state.applyFilter && ele.price.actual >= this.state.filterByPrice.min && ele.price.actual <=this.state.filterByPrice.max) {
        dataItems.push(this.getElement(ele, i));
      }
      if (!this.state.filterByName && !this.state.applyFilter){
        dataItems.push(this.getElement(ele, i));
      }
    });

    return (
      <div>
        <div className="dataContainer__div displayInColumn">
          {dataItems}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return{
    data: state.data
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addToCart: (name) => dispatch({type: 'ADD_TO_CART', name}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataContainer);
