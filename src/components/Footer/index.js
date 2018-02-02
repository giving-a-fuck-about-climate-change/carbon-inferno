import React from 'react';
import ListWrapper from '../List/ListWrapper';
import { footerLinks, socialLinks, contributingLinks } from '../../constants';
import './footer.css';

const Footer = () => (
  <div className="footer-container">
    <div className="footer">
      <ListWrapper items={footerLinks} />
      <ListWrapper items={socialLinks} />
      <ListWrapper items={contributingLinks} />
    </div>
  </div>
);

export default Footer;
