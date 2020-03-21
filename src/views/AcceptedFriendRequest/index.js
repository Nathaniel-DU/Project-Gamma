import React, { Fragment, Component } from 'react';
import './style.css';

export default class AcceptedFriendRequest extends Component {
    componentDidMount(){
        const {userid, friendid} = this.props.match.params;
        fetch(`/user/${userid}/friends/accept/${friendid}/confirmed`);
    }

    render() {
        return (
            <Fragment>
                <h1>StaySafe</h1>
                <h3>Friend request has been accepted.</h3>
                <br/>
                <h5>You may now close this window and return to your app.</h5>
            </Fragment>
        )
    }
}
