import React, {useEffect, useState} from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import 'moment/locale/id';
import Swal from 'sweetalert2';
import axios from 'axios';
import './css/Test.css';

import unknown from './img/unknown.svg';
import cerah from './img/cerah.svg';
import cerahBerawan from './img/cerahBerawan.svg';
import cerahMendung from './img/cerahMendung.svg';
import cerahHujan from './img/cerahHujan.svg';
import cerahBadai from './img/cerahBadai.svg';
import malam from './img/malam.svg';
import malamBerawan from './img/malamBerawan.svg';
import malamMendung from './img/malamMendung.svg';
import malamHujan from './img/malamHujan.svg';
import malamBadai from './img/malamBadai.svg';
import gerimis from './img/gerimis.svg';
import hujan from './img/hujan.svg';
import hujanLebat from './img/hujanLebat.svg';
import hujanBadai from './img/hujanBadai.svg';

function Test () {
    const [clockText, setClockText] = useState('Enjoy your breath');
    const [quote, setQuote] = useState({author: null, from: null, text: null});
    const [weather, setWeather] = useState({icon: unknown, temp: null, desc: null});

    const qu = 
    {
        author: 'KHALID',
        from: null,
        text: 'MAYBE YOU WEREN\'T THE ONE FOR ME BUT DEEP DOWN <br/>I WANTED YOU TO BE'
    }
    const me = 
    {
        author: 'ME',
        from: null,
        text: 'I\'M GLAD THAT YOU HAVE BECOME THE BEST A PART OF MY LIFE'
    }

    useEffect( () => {
        document.title = 'TESTING PAGE'
        setQuote(qu);
        getLocation();
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

    function heartClick() {
        setClockText('Tada');
        setQuote(me);
        document.title = "YES YOU"
        const body = document.body;
        body.classList.add('change');
    }

    function getWeather(long, lat) {
        axios({
          method: 'get',
          url: 'https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+long+'&units=metric&appid=c2ca00558e33de38624a93e41701c43c',
        })
        .then ( response => {
            console.log(response);
            const temp = response.data.current.temp;
            const desc = response.data.current.weather[0].description;
            let icon = unknown;
            switch(desc) {
                case 'scattered clouds':
                    icon = cerahBerawan;
                    break;
            }
            setWeather({...weather, temp: temp, desc: desc, icon: icon});
        })
        .catch ( e => {
          Swal.fire('Cannot get weather data!', e.toString(), 'error');
        });
      }

    function getLocation () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, errorLocation)
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }
    function showPosition(position) {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        getWeather(long, lat);
    } 

    function errorLocation() {
        Swal.fire('Error!','Aplikasi tidak diizinkan untuk mengambil data cuaca', 'error');
    }

    return (
    <>
        <div className="weather">
            <div className="weather-temp">
                {weather.temp + '\u00b0C'}
            </div>
            <div className="weather-icon">
                <img src={weather.icon} alt='weather icon'/>
            </div>
            <div className="weather-desc">
                {weather.desc}
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
                    
                    <input id="toggle-heart" type="checkbox" onClick={() => heartClick()}/>
                    <label htmlFor="toggle-heart" aria-label="like">❤</label>
                </div>
                <div className="clock-text">
                    {clockText}
                </div>
            </div>
        </div>
        <div className="quote">
            <div className="quote-text" dangerouslySetInnerHTML={{__html: quote.text}}/>
            <div className="quote-author">
                ({quote.author}{quote.from !== null ? '-' : null}{quote.from})
            </div>
        </div>
    </>
    );
}

export default Test;