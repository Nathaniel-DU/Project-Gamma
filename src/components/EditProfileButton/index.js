import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './style.css';

export default class EditProfileButton extends Component {

    
    
    render(){
        return(
            <div>
                <Link to="/"><button className='blue-button' id='edit-profile-button'>Edit Profile</button></Link>
            </div>
        )
    }
}