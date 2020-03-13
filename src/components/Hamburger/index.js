import React from 'react';
import { stack as Menu } from 'react-burger-menu'
import Signout from '../Signout';
import './style.css';

class Hamburger extends React.Component {
  showSettings (event) {
    event.preventDefault();
  }

  render () {
    return (
        <div>
            <Menu pageWrapId={"page-wrap"} outerContainerId={ "outer-container" }>
                {
                  // <Signout/>
                }
            </Menu>
        </div>
    );
  }
}

export default Hamburger;