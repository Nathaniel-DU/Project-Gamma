import React from 'react';
import './style.css';

export default function Button({ text, loginWithRedirect }) {
return <button onClick={() => loginWithRedirect({})} className='mint-button'>{text}</button>
};