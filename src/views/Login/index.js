import React, { Fragment } from "react";
import Header from '../../components/Header';
import Button from '../../components/Button/';
import Logo from '../../assets/logo.png'
import './style.css';

const Home = () => (
  <Fragment>
    <Header text='Welcome to StaySafe!' />
      <img className='staysafe-logo' src={Logo}></img>
      <a href="https://stay-safe.auth0.com/login?client=OmzFe7Noy1kudMac7iJ1vsluSVztsdUr"><Button text='Login' /></a>
      <Button text='Sign Up' />
  </Fragment>
);

export default Home;
