import React, { Component } from "react";
import friendsList from '../utils/friendsList';
import SingleFriend from './singleFriend';

export default class Friends extends Component {
    state = {
        friends: []
    }

    componentDidMount() {
        friendsList()
            .then(data => this.setState({ friends: data }))
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div>

                {this.state.friends.map((friend, i) => <SingleFriend key={i + '-friendlist'} name={friend.name} location={friend.location} />)}
            </div>
        )
    }
}