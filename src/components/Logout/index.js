import React, {Component} from 'react';
import axios from 'axios';
import './style.css';

export default class Logout extends Component {

    logOut = () => {
        axios.put(`/event/stop`)
            .then(() => {
                axios.get(`/auth/logout`)
                    .then(res => {
                        if(res.status === 200){
                            window.location.replace(`/`);
                        }
                    });
            });
    }
    
    render(){
        return(
            <div>
                <button className='blue-button' id='logout-button' onClick={this.logOut}>Logout</button>
            </div>
        );
    }
}
