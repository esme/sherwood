import React from 'react';
import axios from 'axios';
import Chart from './Chart';
import moment from 'moment';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
    this.state = {};
    this.getStock = this.getStock.bind(this);
  }

  componentDidMount() {
    this.getStock();
    this.getDesc();
  }

  getStock() {
    axios.get('/stock/' + window.location.pathname.split('/')[1])
      .then(({data}) => {
        const sortedData = data.sort((a, b) => new Date(a.date) - new Date(b.date))
        console.log(sortedData);
        const prices = [];
        const dates = [];
        sortedData.map(el => {
          dates.push(moment(el.date).format('hh:mm A'));
          prices.push(el.close);
        })
        // console.log(dates, prices);
        this.setState({
          dates,
          prices,
        })
      })
  }

  getDesc() {
    axios.get('/desc/' + window.location.pathname.split('/')[1])
      .then(({data}) => {
        const { name, desc } = data;
        this.setState({
          name,
          desc,
        })
      })
  }

  render() {
    let { prices, dates, desc, name } = this.state;
    return (
      <div id="stock-chart-container">
        {name && <h1 id="stock-chart-name">{name}</h1>}
        <div id="stock-chart-price">
          <span>$</span>
          <span>1</span>
          <span>9</span>
          <span>8</span>
          <span>.</span>
          <span>7</span>
          <span>0</span>
        </div>
        {prices && <Chart dates={dates} prices={prices}/>}
        <div style={{width: 676}}>
          {desc && <p>{desc}</p>}
        </div>
      </div>
    );
  }
}

export default App;
