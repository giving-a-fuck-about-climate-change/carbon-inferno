import React, { Component } from 'react';
import 'whatwg-fetch';
import moment from 'moment';
import fetchData from '../../utils/request';

import config from '../../config';

import {
  InfoColumnHOC,
  LoadingWrapper,
  TimeChoiceHeader,
} from '../../components';

import {
  calculateAverage,
  calculateDiff,
  calculatePercentageDiff,
  getData,
  todaysDate,
  subDate,
} from '../../utils';

import { timeHeaderLinks, WEEK, MONTH, YEAR, ALL } from '../../constants';

// ENDPOINTS

const { apiEndpoint } = config;
const ppmEndpoint = `${apiEndpoint}/api/co2`;

const dateRangQuery = timePeriod =>
  `${ppmEndpoint}/?ordering=+date&date__range=${subDate(
    timePeriod,
  )},${todaysDate()}`;
const currentPpmEndpoint = `${ppmEndpoint}/?ordering=-date?&limit=1`;
const getEndpointForAll = ({ count }) =>
  `${ppmEndpoint}/?ordering=+date&limit=${count}`;
const monthEndpoint = dateRangQuery(MONTH);

// EXTENDED COMPONENT FUNCTIONALITY HELPERS

const rangeTypeHasChanged = (updatedRangeType, currentRangeType) =>
  updatedRangeType !== currentRangeType;

const calculateSubHeader = (rangeType) => {
  const getHeader = range => ({
    ppmDiff: `SINCE LAST ${range}`,
    percentDiff: `SINCE LAST ${range} (%)`,
  });
  switch (rangeType) {
    case WEEK:
      return getHeader(WEEK);
    case MONTH:
      return getHeader(MONTH);
    case YEAR:
      return getHeader(YEAR);
    default:
      return { ppmDiff: '', percentDiff: '' };
  }
};

const initalSubHeader = calculateSubHeader(MONTH);

const populateWithClicks = (callApi, callApiWithCount) => (item) => {
  const { type } = item;
  switch (type) {
    case WEEK:
      return { ...item, onClick: callApi(type) };
    case MONTH:
      return { ...item, onClick: callApi(type) };
    case YEAR:
      return { ...item, onClick: callApiWithCount(type) };
    case ALL:
      return { ...item, onClick: callApi(type) };
    default:
      return item;
  }
};

// METHODS USED TO UPDATE THE STATE

const setStateWithLoading = rangeType => (prevState) => {
  const { ppmDiff, percentDiff } = calculateSubHeader(rangeType);
  return {
    loading: !prevState.loading,
    diffPPMSubHeader: ppmDiff,
    diffPercentSubHeader: percentDiff,
    rangeType,
  };
};

const setStateWithApiResult = (rangeType, results) => (prevState) => {
  const { currentPPM } = prevState;
  const average = calculateAverage(results);
  return {
    loading: false,
    ppms: getData('ppm', results),
    dates: getData('date', results),
    average,
    ppmDiff: `${calculateDiff(average, currentPPM)} PPM`,
    ppmPercentDiff: `${calculatePercentageDiff(average, currentPPM)} %`,
    rangeType,
    data: results.map((item, idx) => {
      const { date, ppm } = item;
      return {
        d: moment(date).format('MMM DD YYYY'),
        p: parseInt(ppm, 10),
        x: idx,
        y: parseInt(ppm, 10),
      };
    }),
  };
};

const setStateWithInitialPpmReq = apiResponse => () => {
  const { currentPPM, ppmsForMonth, totalPPMCount, rangeType } = apiResponse;
  const average = calculateAverage(ppmsForMonth);
  return {
    loading: false,
    currentPPM,
    count: totalPPMCount,
    ppms: getData('ppm', ppmsForMonth),
    dates: getData('date', ppmsForMonth),
    average,
    ppmDiff: `${calculateDiff(average, currentPPM)} PPM`,
    ppmPercentDiff: `${calculatePercentageDiff(average, currentPPM)} %`,
    rangeType,
    data: ppmsForMonth.map((item, idx) => {
      const { date, ppm } = item;
      return {
        d: moment(date).format('MMM DD YYYY'),
        p: parseInt(ppm, 10),
        x: idx,
        y: parseInt(ppm, 10),
      };
    }),
  };
};

const setStateWithApiError = (rangeType, apiError) => () => ({
  loading: false,
  error: apiError,
  rangeType,
});

// Component
class ChartInfo extends Component {
  state = {
    loading: true,
    currentPPM: 0,
    ppms: [],
    dates: [],
    ppmDiff: '',
    ppmPercentDiff: '',
    error: '',
    diffPPMSubHeader: initalSubHeader.ppmDiff,
    diffPercentSubHeader: initalSubHeader.percentDiff,
    count: 0, // total recorded ppms for 'all' query
    rangeType: MONTH, // Intitial date range query
    data: [],
    hoverLoc: null,
    activePoint: null,
  };
  /*
   When the component mounts we want to make two queries
    - Get the current ppm and total amount of ppms ever (used for the query to get all ppms).
    - The amount of ppms for this month
  */
  async componentDidMount() {
    try {
      const [currentPPM, ppmsForMonth] = await Promise.all([
        fetchData(currentPpmEndpoint),
        fetchData(monthEndpoint),
      ]);
      const totalPPMCount = currentPPM.count;
      const { ppm } = currentPPM.results[0];
      const { results } = ppmsForMonth;
      this.setState(
        setStateWithInitialPpmReq({
          currentPPM: ppm,
          ppmsForMonth: results,
          totalPPMCount,
        }),
      );
    } catch (err) {
      this.setState(setStateWithApiError(MONTH, err)); // eslint-disable-line
    }
  }

  fetchPpmsForRange = rangeType => (event) => {
    event.preventDefault();
    if (rangeTypeHasChanged(rangeType, this.state.rangeType)) {
      // only call api when the rangeType has changed.
      this.setState(setStateWithLoading(rangeType), async () => {
        const isReqForAll = rangeType === ALL;
        const endpoint = isReqForAll
          ? getEndpointForAll(this.state)
          : dateRangQuery(rangeType);
        try {
          const { results } = await fetchData(endpoint);
          this.setState(setStateWithApiResult(rangeType, results));
        } catch (err) {
          this.setState(setStateWithApiError(rangeType, err));
        }
      });
    }
  };
  /*
   The api does not return all entries for a given date range,
   if we want all entries we need to sepcify a count, here we query
   for the amount of entries for a date range and then make another query
   the specifying that we want all the entries for that date range by using
   the count param
  */
  fetchPpmsForRangeBasedOnCount = rangeType => (event) => {
    event.preventDefault();
    if (rangeTypeHasChanged(rangeType, this.state.rangeType)) {
      // only call api when the rangeType has changed.
      this.setState(setStateWithLoading(rangeType), async () => {
        try {
          const endpoint = dateRangQuery(rangeType);
          const { count } = await fetchData(endpoint); // get total amount of ppms for specified date range
          const { results } = await fetchData(`${endpoint}&limit=${count}`); // query for ppms limiting to count result
          this.setState(setStateWithApiResult(rangeType, results));
        } catch (err) {
          this.setState(setStateWithApiError(rangeType, err));
        }
      });
    }
  };

  // Decorate links with click functionality depending on link type : year, month etc
  populateWithClickFuncs = () =>
    populateWithClicks(
      this.fetchPpmsForRange,
      this.fetchPpmsForRangeBasedOnCount,
    );

  // GET X & Y || MAX & MIN
  getX() {
    const { data } = this.state;
    return {
      min: data[0].x,
      max: data[data.length - 1].x,
    };
  }
  getY() {
    const { data } = this.state;
    return {
      min: data.reduce((min, p) => (p.y < min ? p.y : min), data[0].y),
      max: data.reduce((max, p) => (p.y > max ? p.y : max), data[0].y),
    };
  }
  // GET SVG COORDINATES
  getSvgX(x) {
    const { svgWidth, yLabelSize } = this.props;
    return yLabelSize + x / this.getX().max * (svgWidth - yLabelSize);
  }
  getSvgY(y) {
    const { svgHeight, xLabelSize } = this.props;
    const gY = this.getY();
    return (
      ((svgHeight - xLabelSize) * gY.max - (svgHeight - xLabelSize) * y) /
      (gY.max - gY.min)
    );
  } // BUILD SVG PATH
  makePath() {
    const { color } = this.props;
    const { data } = this.state;

    let pathD = `M ${this.getSvgX(data[0].x)} ${this.getSvgY(data[0].y)} `;

    pathD += data.map(
      point => `L ${this.getSvgX(point.x)} ${this.getSvgY(point.y)} `,
    );
    return (
      <path className="linechart_path" d={pathD} style={{ stroke: color }} />
    );
  }
  // BUILD SHADED AREA
  makeArea() {
    const { data } = this.state;
    let pathD = `M ${this.getSvgX(data[0].x)} ${this.getSvgY(data[0].y)} `;

    pathD += data.map(
      (point, i) => `L ${this.getSvgX(point.x)} ${this.getSvgY(point.y)} `,
    );

    const x = this.getX();
    const y = this.getY();
    pathD +=
      `L ${this.getSvgX(x.max)} ${this.getSvgY(y.min)} ` +
      `L ${this.getSvgX(x.min)} ${this.getSvgY(y.min)} `;

    return <path className="linechart_area" d={pathD} />;
  }
  // BUILD GRID AXIS
  makeAxis() {
    const { yLabelSize } = this.props;
    const x = this.getX();
    const y = this.getY();

    const topLineXBeginPos = this.getSvgX(x.min) - yLabelSize;
    const topLineYBeginPos = this.getSvgY(y.min);
    const topLineXEndPos = this.getSvgX(x.max);
    const topLineYEndPos = this.getSvgY(y.min);

    const bottomLineXBeginPos = this.getSvgX(x.min) - yLabelSize;
    const bottomLineYBeginPos = this.getSvgY(y.max);
    const bottomLineXEndPos = this.getSvgX(x.max);
    const bottomLineYEndPos = this.getSvgY(y.max);

    return (
      <g className="linechart_axis">
        <line
          x1={topLineXBeginPos}
          y1={topLineYBeginPos}
          x2={topLineXEndPos}
          y2={topLineYEndPos}
          strokeDasharray="5"
        />
        <line
          x1={bottomLineXBeginPos}
          y1={bottomLineYBeginPos}
          x2={bottomLineXEndPos}
          y2={bottomLineYEndPos}
          strokeDasharray="5"
        />
      </g>
    );
  }

  makeLabels() {
    const { svgHeight, svgWidth, xLabelSize, yLabelSize } = this.props;
    const padding = 5;
    return (
      <g className="linechart_label">
        {/* Y AXIS LABELS */}
        <text
          transform={`translate(${yLabelSize / 2}, 20)`}
          textAnchor="middle"
        >
          {this.getY().max}
        </text>
        <text
          transform={`translate(${yLabelSize / 2}, ${svgHeight -
            xLabelSize -
            padding})`}
          textAnchor="middle"
        >
          {this.getY().min}
        </text>
        {/* X AXIS LABELS */}
        <text
          transform={`translate(${yLabelSize}, ${svgHeight})`}
          textAnchor="start"
        >
          {this.state.data[0].d}
        </text>
        <text
          transform={`translate(${svgWidth}, ${svgHeight})`}
          textAnchor="end"
        >
          {this.state.data[this.state.data.length - 1].d}
        </text>
      </g>
    );
  }

  // FIND CLOSEST POINT TO MOUSE
  getCoords = (e) => {
    const { svgWidth, yLabelSize } = this.props;
    const { data } = this.state;
    const svgLocation = document
      .getElementsByClassName('linechart')[0]
      .getBoundingClientRect();
    const adjustment = (svgLocation.width - svgWidth) / 2; // takes padding into consideration
    const relativeLoc = e.clientX - svgLocation.left - adjustment;

    const svgData = [];
    data.map((point) => {
      svgData.push({
        svgX: this.getSvgX(point.x),
        svgY: this.getSvgY(point.y),
        d: point.d,
        p: point.p,
      });
    });

    let closestPoint = {};
    for (let i = 0, c = 500; i < svgData.length; i++) {
      if (Math.abs(svgData[i].svgX - this.state.hoverLoc) <= c) {
        c = Math.abs(svgData[i].svgX - this.state.hoverLoc);
        closestPoint = svgData[i];
      }
    }

    if (relativeLoc - yLabelSize < 0) {
      this.stopHover();
    } else {
      this.setState({
        hoverLoc: relativeLoc,
        activePoint: closestPoint,
      });
    }
  };
  // STOP HOVER
  stopHover = () => {
    this.setState({ hoverLoc: null, activePoint: null });
  };
  // MAKE ACTIVE POINT
  makeActivePoint() {
    const { color, pointRadius } = this.props;
    return (
      <circle
        className="linechart_point"
        style={{ stroke: color }}
        r={pointRadius}
        cx={this.state.activePoint.svgX}
        cy={this.state.activePoint.svgY}
      />
    );
  }
  // MAKE HOVER LINE
  createLine() {
    const { svgHeight, xLabelSize } = this.props;
    return (
      <line
        className="hoverLine"
        x1={this.state.hoverLoc}
        y1={-8}
        x2={this.state.hoverLoc}
        y2={svgHeight - xLabelSize}
      />
    );
  }

  render() {
    const {
      currentPPM,
      ppmDiff,
      ppmPercentDiff,
      diffPPMSubHeader,
      diffPercentSubHeader,
      rangeType,
      loading,
    } = this.state;
    const svgHeight = 300;
    const svgWidth = 900;
    return (
      <div>
        <div className="flex-grid-header">
          <TimeChoiceHeader
            timeHeaderLinks={timeHeaderLinks.map(this.populateWithClickFuncs())}
          />
        </div>
        <LoadingWrapper loading={loading}>
          <div>
            <InfoColumnHOC
              rangeType={rangeType}
              currentPPM={currentPPM}
              ppmDiff={ppmDiff}
              ppmPercentDiff={ppmPercentDiff}
              diffPPMSubHeader={diffPPMSubHeader}
              diffPercentSubHeader={diffPercentSubHeader}
            />
            <div className="graph-container">
              {this.state.data.length > 0 ? (
                <svg
                  width={svgWidth}
                  height={svgHeight}
                  viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                  className={'linechart'}
                  onMouseMove={this.getCoords}
                  onMouseLeave={this.stopHover}
                >
                  <g>
                    {this.makeAxis()}
                    {this.makePath()}
                    {this.makeArea()}
                    {this.makeLabels()}
                    {this.state.hoverLoc ? this.createLine() : null}
                    {this.state.hoverLoc ? this.makeActivePoint() : null}
                  </g>
                </svg>
              ) : null}
            </div>
          </div>
        </LoadingWrapper>
      </div>
    );
  }
}

export default ChartInfo;
// DEFAULT PROPS
ChartInfo.defaultProps = {
  color: '#2196F3',
  pointRadius: 5,
  svgHeight: 300,
  svgWidth: 900,
  xLabelSize: 20,
  yLabelSize: 80,
};
