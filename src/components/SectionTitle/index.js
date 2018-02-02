import React from 'react';
import './sectionTitle.css';

const SectionTitle = ({ text }) => (
  <div className="divider">
    <div className="hr" />
    <p className="title-text">{text}</p>
    <div className="hr" />
  </div>
);

export default SectionTitle;
