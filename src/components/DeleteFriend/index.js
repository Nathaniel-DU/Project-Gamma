import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserMinus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

export default class DeleteFriend extends Component {

    deleteUser = () => {
        axios.get(`/user/remove/${this.props.userId}`)
    }

    render(){

        return (
            <button onClick={this.deleteUser}>
                <FontAwesomeIcon className="fa-icon" icon={faUserMinus} />
            </button>
        )
    }

}