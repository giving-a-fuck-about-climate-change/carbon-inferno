import React, { Component } from 'react';
import './App.css';
import { Line } from 'react-chartjs-2';
import { dayData, weekData } from './data'
import 'whatwg-fetch';

const globalSubHeader = 'GLOBAL CO2 LEVEL';
const diffPPMSubHeader = 'SINCE LAST WEEK';
const diffPercentSubHeader = 'SINCE LAST WEEK (%)';

 const InfoColDiv = ({ statInfo, subHeader }) => {
  return (
    <div className="info-col">
      <div className="info-wrapper">
        <div className="stat-info"> {statInfo} </div>
        <div className="sub-header"> {subHeader} </div>
      </div>
    </div>
  );
 };

const calculateAverage = (arr) => {
  const totalAmount = arr.reduce((total, item) => {
    return total + item.ppm;
  },0);
  return (totalAmount / arr.length);
}

const calculateDiff = (previous, current) => {
  return previous > current ?
    `- ${(previous - current).toFixed(2)}` :
    `+ ${(current - previous).toFixed(2)}`;
}

const calculatePercentageDiff = (previous, current) => {
  const diff = ((previous/current) / previous) * 100;
  return diff.toFixed(2);
}

const getData = (label) => {
  const { results } = weekData;
  return results.map((data) => data[label]);
}

const data = {
  labels: getData('date'),
  datasets: [
    {
      label: 'PPM',
      fill: true,
      lineTension: 0.1,
      backgroundColor: 'rgba(240, 153, 159, 0.81)',
      borderColor: 'rgba(255, 107, 117, 0.81)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 8,
      pointHoverRadius: 2,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: getData('ppm'),
    }
  ]
}

class App extends Component {

  constructor(props) {
    super(props)
    const currWeekStat = dayData.results[0].ppm;
    const lastWeekAverage = calculateAverage(weekData.results);
    this.state = {
      todaysPpm: `${currWeekStat} PPM`,
      ppmDiff: `${calculateDiff(lastWeekAverage, currWeekStat)} PPM`,
      ppmPercentDiff: `${calculatePercentageDiff(lastWeekAverage, currWeekStat)} PPM`
    };
  }

  render() {
    const { todaysPpm, ppmDiff, ppmPercentDiff } = this.state;
    return (
      <div className="App">
       <div className="flex-grid">
         <InfoColDiv statInfo={todaysPpm} subHeader={globalSubHeader}/>
         <InfoColDiv statInfo={ppmDiff} subHeader={diffPPMSubHeader}/>
         <InfoColDiv statInfo={ppmPercentDiff} subHeader={diffPercentSubHeader}/>
        </div>
       <div>
         <Line data={data} width={600} height={250}/>
      </div>
      </div>
    );
  }
}

export default App;
