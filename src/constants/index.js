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
    href: 'https://twitter.com/carbondoomsday',
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
    href: 'https://gitter.im/giving-a-fuck-about-climate-change/Lobby',
    title: 'Work with us',
    subTitle: 'As little as one hour per week',
    icon: FaChild,
  },
];

export const WEEK = 'week';
export const MONTH = 'month';
export const YEAR = 'year';
export const FIVE_YEAR = 'five_years';
export const ALL = 'all';

export const timeHeaderLinks = [
  { href: WEEK, className: '', text: '1 Week', type: WEEK },
  { href: MONTH, className: '', text: '1 Month', type: MONTH },
  { href: YEAR, className: '', text: '1 Year', type: YEAR },
  { href: FIVE_YEAR, className: '', text: '5 Years', type: FIVE_YEAR },
  { href: ALL, className: '', text: 'All', type: ALL },
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
