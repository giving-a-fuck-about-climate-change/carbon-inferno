import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import 'whatwg-fetch';

import '../../App.css';
import { dayData, weekData } from '../../data'
import {
  Footer,
  Header,
  InfoColumn,
  Resources,
  TimeChoiceHeader,
} from '../../components'
import {
  calculateAverage,
  calculateDiff,
  calculatePercentageDiff,
  getData,
} from '../../utils';

const globalSubHeader = 'GLOBAL CO2 LEVEL';
const diffPPMSubHeader = 'SINCE LAST WEEK';
const diffPercentSubHeader = 'SINCE LAST WEEK (%)';

const data = {
  labels: getData('date', weekData),
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
      data: getData('ppm', weekData),
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
      ppmPercentDiff: `${calculatePercentageDiff(lastWeekAverage, currWeekStat)} %`
    };
  }

  render() {
    const { todaysPpm, ppmDiff, ppmPercentDiff } = this.state;
    return (
    <div>
      <div className="page-background">
        <Header/>
        <div className="App">
          <div className="flex-grid-header">
            <TimeChoiceHeader/>
          </div>
          <div className="flex-grid">
            <InfoColumn statInfo={todaysPpm} subHeader={globalSubHeader}/>
            <InfoColumn statInfo={ppmDiff} subHeader={diffPPMSubHeader}/>
            <InfoColumn statInfo={ppmPercentDiff} subHeader={diffPercentSubHeader}/>
          </div>
          <div>
            <Line data={data} width={500} height={200}/>
          </div>
        </div>
        <Resources/>
      </div>
      <Footer/>
    </div>
    );
  }
}

export default App;
