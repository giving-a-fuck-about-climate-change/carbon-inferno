import React from 'react';

const DataSources = () => (
  <div>
    <div className="text-page">
      <div className="team-header">Data Sources</div>
      <p>
        All of our data is thanks to the work of scientists at{' '}
        <a href="https://www.esrl.noaa.gov/">NOAA's ESRL</a> who have
        painstakingly measured carbon dioxide every day since 1958. Their data
        is free and public.
      </p>
      <p>
        Their release notes say:<br />
        <em>
          This data are made freely available to the public and the scientific
          community in the belief that their wide dissemination will lead to
          greater understanding and new scientific insights.
        </em>
      </p>
      <p>
        This data needs to be more accessible. And that's where Carbon Doomsday
        comes in. We've built a web API and real-time chart of carbon dioxide
        data.
      </p>
      <p>
        You can see our most up to date list of sources{' '}
        <a href="https://github.com/giving-a-fuck-about-climate-change/carbondoomsday/blob/fc3d5cfc71a4f971ef9c3d2a182158ec7d3ec591/carbondoomsday/measurements/views.py#L13-L34">
          here
        </a>.
      </p>
    </div>
  </div>
);

export default DataSources;
