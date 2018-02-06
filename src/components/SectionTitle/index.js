import React from 'react';
import './sectionTitle.css';

const SectionTitle = ({ text }) => (
  <div className="divider">
    <hr />
    <p className="title-text">{text}</p>
    <hr />
  </div>
);

export default SectionTitle;
