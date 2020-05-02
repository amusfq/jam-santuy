import React, {useEffect, useState} from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import 'moment/locale/id';
import './css/Test.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHeart} from '@fortawesome/free-solid-svg-icons'

import cerahBadai from './img/cerahBadai.svg';

function Test () {
    const [clockText, setClockText] = useState('Enjoy your breath');

    useEffect( () => {
        document.title = 'TESTING PAGE'
    }, [])

    useEffect( () => {
        setTimeout(() => {
            setClockText('Hey');

            setTimeout(() => {
                setClockText('I want tell u something');
                
                setTimeout(() => {
                    setClockText('Try click the button');
                    
                }, 5000);
            }, 5000);
        }, 5000);
    }, []);

    return (
    <>
        <div className="weather">
            <div className="weather-temp">
                {'28\u00b0C'}
            </div>
            <div className="weather-icon">
                <img src={cerahBadai} alt='weather icon'/>
            </div>
            <div className="weather-desc">
                party cloud
            </div>
        </div>
        <div className="clock">
            <div className="clock-top">
                <Moment interval={1000} format='DD MMMM YYYY' locale='id' />
            </div>
            <div className="clock-middle">
                <Moment interval={1000} format='HH:mm:ss' />
            </div>
            <div className="clock-bottom">
                <div className="clock-day">
                    <Moment interval={1000} format='dddd' locale='id' />
                </div>
                <div className="clock-icon">
                    {/* <FontAwesomeIcon icon={faHeart} style={{color: '#e74c3c'}}/> */}
                    
                    <input id="toggle-heart" type="checkbox" onClick={() => setClockText('Tada')}/>
                    <label for="toggle-heart" aria-label="like">❤</label>
                </div>
                <div className="clock-text">
                    {clockText}
                </div>
            </div>
        </div>
        <div className="quote">
            <div className="quote-text" dangerouslySetInnerHTML={{__html: "MAYBE YOU WEREN'T THE ONE FOR ME BUT DEEP DOWN <br> I WANTED YOU TO BE"}}/>
            <div className="quote-author">
                (KHALID)
            </div>
        </div>
    </>
    );
}

export default Test;