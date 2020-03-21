import React, { Component } from "react";
import friendsList from '../../utils/friendsList';
import SingleFriend from '../SingleFriend';

export default class Friends extends Component {
    state = {
        friends: [],
        intervalId: ''
    }

    componentDidMount() {
        friendsList()
            .then(data => this.setState({ friends: data }))
            .catch(err => console.log(err));
        const intervalId = setInterval(this.updateFriendsList, 1000*10);
        this.setState({intervalId: intervalId});
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }

    updateFriendsList = () => {
        friendsList()
            .then(data => this.setState({ friends: data }))
            .catch(err => console.log(err));
    }

    render() {
        if(this.state.friends.length > 0){
            return (
                <div>
                    {this.state.friends.map((friend, i) => <SingleFriend key={i + '-friendlist'} userId={friend.userId} name={friend.name} location={friend.location} />)}
                </div>
            )
        }else{
            return <div></div>
        }
    }
}