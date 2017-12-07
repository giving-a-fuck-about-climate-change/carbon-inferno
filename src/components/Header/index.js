import React from 'react';
import { ROOT } from '../../routes';
import './header.css';

const Header = () => (
  <div className="header-flex">
    <img className="logo" src="/skull.png" alt="Carbon Doomsday" />
    <div>
      <div className="header">
        <a href={ROOT}>Carbon Doomsday</a>
      </div>
      <div className="header-sub">tracking CO&#8322; since 1958</div>
    </div>
  </div>
);
export default Header;
