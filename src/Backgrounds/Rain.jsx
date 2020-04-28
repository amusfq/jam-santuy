import React, { useState, useEffect } from 'react';
import ReactRain from 'react-rain-animation';
import "react-rain-animation/lib/style.css";
import '../css/Rain.css';

function Rain() {

    const body = document.querySelector('body');
   
    useEffect( () => {
        body.classList.add('rain-body');
        return () => {
            body.classList.remove('rain-body');
        }
    }, []);

    return (
        <>
            <ReactRain numDrops='150'/>
        </>
    );
}

export default Rain;