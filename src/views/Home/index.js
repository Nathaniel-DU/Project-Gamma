import React, { Fragment, useState } from "react";
import Header from '../../components/Header';
import Button from '../../components/Button/';
import Logo from '../../assets/logo.png'
import './style.css';

import { useAuth0 } from "../../react-auth0-spa";

const Home = () => {
  const {loginWithRedirect} = useAuth0();
    return(
      <Fragment>
        <Header text='Welcome to StaySafe!' />
          <img className='staysafe-logo' alt='StaySafe Logo' src={Logo}></img>
          <button onClick={loginWithRedirect} className='mint-button'>Login</button>
          <a href="/auth/create"><button className='mint-button'>Sign Up</button></a>
      </Fragment>
    )
};

export default Home;