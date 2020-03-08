import React from 'react';
import './style.css';

export default function StartLocationButton({ text, getMyLocation, startTrip }) {
return <button onClick={() => {getMyLocation(); startTrip();}} className='start-button'>{text}</button>

};

