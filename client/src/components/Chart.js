import React from 'react';
const ChartJS = require("chart.js");

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
  }

  componentDidMount() {
    const { dates, prices } = this.props;
    const ctx = this.chartRef.current.getContext('2d');
      new ChartJS(ctx, {
        type: 'line',
        responsive: true,
        maintainAspectRatio: false,
        data: {
          labels: dates,
          datasets: [{
            lineTension: 0,
            backgroundColor: 'rgba(0,0,0,0)',
            borderColor: '#18bc9c',
            data: prices,
            pointHoverRadius: 5,
            pointHoverBorderWidth: 1,
            pointHoverBorderColor: '#222',
            pointHoverBackgroundColor: '#18bc9c'
          }],
        },
        options: {
          legend: {
            display: false,
          },
          tooltips: {
            mode: 'x',
          },
          elements: {
            point:{
                radius: 0
            }
          },
          scales: {
            yAxes: [{
                ticks: {
                    display: false,
                    min: Math.min.apply(null, prices) - 1,
                    max: Math.max.apply(null, prices) + 1,
                },
                gridLines: {
                  display: false,
                  drawBorder: false
              }
            }],
            xAxes: [{
              ticks: {
                  display: false,
                  beginAtZero: true,
              },
              gridLines: {
                display: false,
                drawBorder: false
            }
          }],
          }
        }
      });
  }

  render() {
    return (
      <div className="chart-container" style={{width: 676, height: 196}} >
        <canvas style={{width: '100%', height: '100%'}} ref={this.chartRef} />
      </div>      
    );
  }
}

export default Chart;