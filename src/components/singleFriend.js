import React from "react";
import DeleteFriend from '../components/DeleteFriend';

export default ({name, location, userId}) => {
    return (
        <div>
            <b>{name} <DeleteFriend userId={userId}/></b> {location}
            <hr/>
        </div>
        
    )
}