import {
  FaGithub,
  FaChild,
  FaLightbulbO,
  FaTwitter,
  FaCog,
  FaCode,
} from 'react-icons/lib/fa';

export const actionCardContent = [
  {
    href:
      'https://github.com/giving-a-fuck-about-climate-change/carbondoomsday',
    title: 'Give us a star on GitHub',
    subTitle: 'Takes 5 seconds',
    icon: FaGithub,
  },
  {
    href: 'https://twitter.com',
    title: 'Tweet this chart',
    subTitle: 'Takes 5 seconds',
    icon: FaTwitter,
  },
  {
    href:
      'https://docs.google.com/forms/d/e/1FAIpQLScWObxJHjnV8uMW9ywqZRo2kgFYNZKmE7aGfhrsTxS-yWXGhw/viewform',
    title: 'Submit an idea',
    subTitle: 'Takes 2 minutes',
    icon: FaLightbulbO,
  },
  {
    href: 'https://www.carbondoomsday.com',
    title: 'Embed this chart',
    subTitle: 'Takes 2 minutes',
    icon: FaCode,
  },
  {
    href: 'http://api.carbondoomsday.com/',
    title: 'Check out our API',
    subTitle: 'Takes 10 minutes',
    icon: FaCog,
  },
  {
    href: '',
    title: 'Work with us!',
    subTitle: 'As little an one hour per week',
    icon: FaChild,
  },
];

export const missionContent = {
  text:
    '<p>What if tracking climate change was as easy as checking the price of Bitcoin?</p><p>Every day, NOAA scientists carefully measure the carbon dioxide in the atmosphere from Mauna Loa, Hawaii. This important data is public but hard to digest. We want to empower everyone around the world to use it.</p><p>So we built Carbon Doomsday to chart carbon dioxide levels.</p><p>Our chart is powered by the worlds first open API for climate change. This enables anyone to enhance NOAAs carbon dioxide data by building charts, sensor networks, and more.</p><p>Our code is open source on Github. We are a growing team of 8 people, including programmers, designers and marketers from the USA, Ireland, Australia and Germany.</p>',
};

export const dataSourceContent = {
  text:
    "<p>All of our data is thanks to the work of scientists at NOAA's ESRL who have painstakingly measured carbon dioxide every day since 1958. Their data is free and public.</p><p><strong>Their release notes say:</strong><br />&#34;This data are made freely available to the public and the scientific community in the belief that their wide dissemination will lead to greater understanding and new scientific insights.&#34;</p><p>This data needs to be more accessible. And that's where Carbon Doomsday comes in. We've built a web API and real-time chart of carbon dioxide data.</p><p>You can see our most up to date list of sources on our Github.</p>",
};

export const socialLinks = [
  { href: '', className: 'footer-title', text: 'Social' },
  {
    href: 'https://twitter.com/carbondoomsday',
    className: '',
    text: 'Twitter',
  },
];

export const contributingLinks = [
  { href: '', className: 'footer-title', text: 'Give a Fuck' },
  { href: '/contribute', className: '', text: 'Contribute' },
  {
    href: 'mailto:contact@carbondoomsday.com',
    className: '',
    text: 'Contact Us',
  },
];

export const footerLinks = [
  { href: '/', className: 'footer-header', text: 'Carbon Doomsday' },
];

export const WEEK = 'week';
export const MONTH = 'month';
export const YEAR = 'year';
export const FIVE_YEAR = 'five_years';
export const ALL = 'all';

export const timeHeaderLinks = [
  { href: '#TODO', className: '', text: '1 Week', type: WEEK },
  { href: '#TODO', className: '', text: '1 Month', type: MONTH },
  { href: '#TODO', className: '', text: '1 Year', type: YEAR },
  { href: '#TODO', className: '', text: '5 Years', type: FIVE_YEAR },
  { href: '#TODO', className: '', text: 'All', type: ALL },
];

export const teamItems = [
  {
    src: 'https://i.imgur.com/XkcNjYd.jpg',
    name: 'Luke Murphy',
    location: 'Rotterdam, The Netherlands',
    position: 'Backend Developer',
    alt: 'Luke Murphy',
  },
  {
    src: 'https://i.imgur.com/ZZgP1Un.jpg',
    name: 'Tito Jankowski',
    location: 'San Francisco, USA',
    position: 'Water Boy',
    alt: 'Tito Jankowski',
  },
  {
    src: 'https://i.imgur.com/v5WOyPs.jpg',
    name: "Martin O'Grady",
    location: 'Dublin, Ireland',
    position: 'Frontend Developer',
    alt: 'Martin OGrady',
  },
  {
    src: 'https://i.imgur.com/GbF4PWV.jpg',
    name: 'Stephanie Tassone',
    location: 'Melbourne, Australia',
    position: 'Frontend Developer',
    alt: 'Stephanie Tassone',
  },
  {
    src: 'https://i.imgur.com/pBbJxNn.jpg',
    name: 'Dan Walsh',
    location: 'San Francisco, USA',
    position: 'Marketer',
    alt: 'Dan Walsh',
  },
  {
    src: 'https://i.imgur.com/NvgqRSm.jpg',
    name: 'Purin Phanichphant',
    location: 'San Francisco, USA',
    position: 'UX/UI',
    alt: 'Purin Phanichphant',
  },
];

export const globalSubHeader = 'GLOBAL CO₂ LEVEL';

export const datasets = [
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
  },
];
export const graphConfig = { datasets };
