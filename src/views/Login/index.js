import React, { Fragment } from "react";
import Header from '../../components/Header';
import Button from '../../components/Button/';
import Logo from '../../assets/logo.png'
import './style.css';

const Home = () => (
  <Fragment>
    <Header text='Welcome to StaySafe!' />
      <img className='staysafe-logo' src={Logo}></img>
      <Button text='Login' />
      <Button text='SignUp' />
  </Fragment>
);

export default Home;
