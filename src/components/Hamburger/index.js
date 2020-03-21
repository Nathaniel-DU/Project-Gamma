import React from 'react';
import { stack as Menu } from 'react-burger-menu'
import Logout from '../Logout';
import EditProfileButton from '../EditProfileButton';
import './style.css';
import Friends from "../Friends";
import FriendSearch from "../FriendSearch";

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
                  <EditProfileButton/>
                  <FriendSearch />
                  <h4>Friends:</h4>
                  <hr/>
                  <Friends/>
                </div>
              }
          </Menu>
        </div>
    );
  }
}

export default Hamburger;