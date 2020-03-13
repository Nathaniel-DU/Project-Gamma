import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Logout extends Component {

    logOut = () => {
        fetch(`/auth/logout`);
    }
    
    render(){
        return(
            <div>
                <Link to="/"><button onClick={this.logOut}>Logout</button></Link>
            </div>
        )
    }
}