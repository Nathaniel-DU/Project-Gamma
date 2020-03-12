import React from 'react';
import { useAuth0 } from "../../react-auth0-spa";

export default function Signout(){
    const { logout } = useAuth0();
    return <button onClick={logout}>Signout</button>;
}
