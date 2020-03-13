import React, { Fragment, useState } from "react";
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Button from '../../components/Button/';
import Logo from '../../assets/logo.png'
import './style.css';


const Home = () => {
  return (
      <Fragment>
        <Header text='Welcome to StaySafe!' />
        <img className='staysafe-logo' alt='StaySafe Logo' src={Logo}></img>
        <Link to="/auth/login"><button className='mint-button'>Login</button></Link>
        <Link to="/auth/create"><button className='mint-button'>Sign Up</button></Link>
      </Fragment>
    )
};

export default Home;