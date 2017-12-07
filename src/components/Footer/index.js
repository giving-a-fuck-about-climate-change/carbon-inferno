import React from 'react';
import ListWrapper from '../List/ListWrapper';
import {
  footerLinks,
  aboutProjectLinks,
  socialLinks,
  contributingLinks,
} from '../../constants';
import './footer.css';

const Footer = () => (
  <div className="footer">
    <ListWrapper items={footerLinks} />
    <ListWrapper items={aboutProjectLinks} />
    <ListWrapper items={socialLinks} />
    <ListWrapper items={contributingLinks} />
  </div>
);

export default Footer;
