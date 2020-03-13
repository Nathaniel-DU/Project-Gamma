import React from 'react';
import { stack as Menu } from 'react-burger-menu'
import Logout from '../Logout';
import './style.css';
import Friends from "../friends";

class Hamburger extends React.Component {
  showSettings (event) {
    event.preventDefault();
  }

  render () {
    return (
        <div>
          <Menu pageWrapId={"page-wrap"} outerContainerId={ "outer-container" }>
              {
                <div>
                  <Logout/>
                  <Friends/>
                </div>
              }
          </Menu>
        </div>
    );
  }
}

export default Hamburger;