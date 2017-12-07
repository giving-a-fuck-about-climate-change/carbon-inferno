import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FaBars, FaClose } from 'react-icons/lib/fa';

import MenuIcon from '../MenuIcon';
import './navigation.css';

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
    };
  }

  handleClick = () => {
    this.setState({ showMenu: !this.state.showMenu });
  };

  render() {
    const { menu } = this.props;
    return (
      <div>
        <div className="menu-large">{menu}</div>
        <div className="menu-small">
          {!this.state.showMenu ? (
            <MenuIcon
              onClick={this.handleClick}
              icon={
                <FaBars
                  size={30}
                  color="grey"
                  style={{ paddingBottom: '10px' }}
                />
              }
            />
          ) : (
            <MenuIcon
              onClick={this.handleClick}
              icon={<FaClose size={30} color="grey" />}
            />
          )}
          {this.state.showMenu ? (
            <div className="menu-small-links">{menu}</div>
          ) : null}
        </div>
      </div>
    );
  }
}
Navigation.propTypes = {
  menu: PropTypes.object.isRequired, //eslint-disable-line
};
export default Navigation;
