import React, { Fragment } from "react";
import StartLocationButton from "../../components/StartLocationButton"
import './style.css';

const StartLocation = () => (
  
  <Fragment>
    <h1>StaySafe</h1>
    <div className="button-list">
      <StartLocationButton className="stop-btn" text='Stop'></StartLocationButton>
      <StartLocationButton className="excuse-btn" text='Excuse Call'></StartLocationButton>
      <StartLocationButton className="pickup-btn" text='Ask for Pickup'></StartLocationButton>
      <StartLocationButton className="panic-btn" text='Request Emergency Assistance'></StartLocationButton>
      <StartLocationButton className="update-loc-btn" text='Update My Location'></StartLocationButton>
    </div>
    
  </Fragment>
);

export default StartLocation;