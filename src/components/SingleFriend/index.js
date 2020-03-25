import React from "react";
import DeleteFriend from '../DeleteFriend';

export default function SingleFriend ({name, location, userId}) {
    return (
        <div>
            <b><DeleteFriend userId={userId}/>{name} </b> 
            <br/>
            {location}
            <hr/>
        </div>
    );
}
