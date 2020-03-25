import React from 'react';
import './style.css';
// eslint-disable-next-line react/prop-types
export default function Button({ text }) {
    return <button className='mint-button'>{text}</button>;
}