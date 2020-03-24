import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWalking } from '@fortawesome/free-solid-svg-icons';
import './style.css';

export default function StartLocationButton({ text, getMyLocation, startTrip }) {
    return <button onClick={() => {getMyLocation(); startTrip();}} className='start-button mint-button'><FontAwesomeIcon className="fa-icon" icon={faWalking} />{text}</button>
};
