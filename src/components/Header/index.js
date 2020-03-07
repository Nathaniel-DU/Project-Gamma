import React from 'react';
import './style.css'

export default function Header({text}) {
    return (
        <h1 className='header'>{text}</h1>
    );
};