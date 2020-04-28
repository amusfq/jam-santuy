import React, { useEffect } from 'react';
import '../css/Clouds.css';

function Clouds() {

    const body = document.querySelector('body');

    useEffect( () => {
        body.classList.add('cloud-body');
        return () => {
            body.classList.remove('cloud-body');
        }
    }, []);

    return(
        <>
            <div id="Clouds">
                <div className="Cloud Foreground"></div>
                <div className="Cloud Background"></div>
                <div className="Cloud Foreground"></div>
                <div className="Cloud Background"></div>
                <div className="Cloud Foreground"></div>
                <div className="Cloud Background"></div>
                <div className="Cloud Background"></div>
                <div className="Cloud Foreground"></div>
                <div className="Cloud Background"></div>
                <div className="Cloud Background"></div>
            </div>
        </>
    );
}

export default Clouds;