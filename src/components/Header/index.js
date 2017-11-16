import React from 'react';
import { ROOT } from '../../routes';

const Header = () => (
  <div className="header-flex">
    <img className="logo" src="/skull.png" alt="Carbon Doomsday" />
    <div>
      <div className="header">
        <a href={ROOT}>Carbon Doomsday</a>
      </div>
      <div className="heading-sub">tracking CO&#8322; since 1958</div>
    </div>
  </div>
);
export default Header;
