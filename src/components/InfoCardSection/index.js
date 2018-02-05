import React from 'react';
import { FaEnvelope } from 'react-icons/lib/fa';
import { InfoCard, TeamItem } from '../../components';

const ContactUs = () => (
  <div>
    <hr className="contact-divider" />
    <div className="contact-container">
      <FaEnvelope size={30} color="grey" className="card-icon" />
      <a href="" className="card-title">
        Contact Us
      </a>
    </div>
  </div>
);

const InfoCardSection = () => (
  <div className="info-cards">
    <InfoCard title="Mission">
      <div className="infocard-text">
        <p>
          What if tracking climate change was as easy as checking the price of
          Bitcoin?
        </p>
        <p>
          Every day, NOAA scientists carefully measure the carbon dioxide in the
          atmosphere from Mauna Loa, Hawaii. This important data is public but
          hard to digest. We want to empower everyone around the world to use
          it.
        </p>
        <p>So we built Carbon Doomsday to chart carbon dioxide levels.</p>
        <p>
          Our chart is powered by the worlds first open API for climate change.
          This enables anyone to enhance NOAAs carbon dioxide data by building
          charts, sensor networks, and more.
        </p>
        <p>
          Our code is open source on Github. We are a growing team of 8 people,
          including programmers, designers and marketers from the USA, Ireland,
          Australia and Germany.
        </p>
      </div>
    </InfoCard>
    <InfoCard title="Data Sources">
      <div className="infocard-text">
        <p>
          All of our data is thanks to the work of scientists at NOAA's ESRL who
          have painstakingly measured carbon dioxide every day since 1958. Their
          data is free and public.
        </p>
        <p>
          <strong>Their release notes say:</strong>
          <br />"This data is made freely available to the public and the
          scientific community in the belief that their wide dissemination will
          lead to greater understanding and new scientific insights."
        </p>
        <p>
          This data needs to be more accessible. And that's where Carbon
          Doomsday comes in. We've built a web API and real-time chart of carbon
          dioxide data.
        </p>
        <p>You can see our most up to date list of sources on our Github.</p>
      </div>
    </InfoCard>
    <InfoCard title="Team">
      <TeamItem />
      <ContactUs />
    </InfoCard>
  </div>
);

export default InfoCardSection;
