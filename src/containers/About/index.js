import React from 'react';

import { ROOT } from '../../routes';
import { Footer, Header } from '../../components';

const About = () => (
  <div>
    <div className="page-background">
      <Header />
      <div className="team-header">About Carbon Doomsday</div>
      <div className="text-page">
        <p>What if tracking climate change was as easy as checking the price of Bitcoin?</p>
        <p>Every day, NOAA scientists carefully measure the carbon dioxide in Earth's atmosphere from Mauna Loa, Hawaii. This important data is public but hard to digest. We want to empower everyone around the world to use it.</p>
        <p>So we built <a href={ROOT}>carbondoomsday.com</a> to chart carbon dioxide levels.</p>
        <p>Our chart is powered by the world's first <a href="http://api.carbondoomsday.com">open API for climate change</a>. This enables anyone to enhance NOAA's carbon dioxide data by building charts, sensor networks, and more.</p>
        <p>Our code is open source on <a href="https://github.com/giving-a-fuck-about-climate-change">Github</a>. We are a growing team of 8 people, including programmers, designers, and marketers from the USA, Holland, and Germany.</p>
      </div>
    </div>
    <Footer />
  </div>
);

export default About;
