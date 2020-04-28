import React, {useState, useEffect} from 'react';
import Moment from 'react-moment';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloud, faSun, faCloudSunRain, faCloudSun, faCloudShowersHeavy, faMoon, faBolt} from '@fortawesome/free-solid-svg-icons'

import 'moment-timezone';
import 'moment/locale/id';

import Clouds from './Backgrounds/Clouds';
import Wave from './Backgrounds/Wave';
import Rain from './Backgrounds/Rain';
import Stars from './Backgrounds/Stars';

import './css/App.css';

function App() {

  const [background, setBackground] = useState(0);
  const [clock, setClock] = useState(null);
  const num_of_background = 4;
  const [weather, setWeather] = useState({
    temp: null,
    weather: null,
  })
  const [weatherIcon, setWeatherIcon] = useState(faSun);

  function renderSwitch(param) {
    switch (param) {
      case 0:
        return <Clouds/>
      case 1:
        return <Wave/>
      case 2:
        return <Rain/>
      case 3:
        return <Stars/>
      default:
        return <Clouds/>
    }
  }
  function getWeather() {
    axios({
      method: 'get',
      url: 'https://api.openweathermap.org/data/2.5/onecall?lat=-7.250445&lon=112.768845&units=metric&appid=c2ca00558e33de38624a93e41701c43c',
    })
    .then ( response => {
      const temp = response.data.current.temp;
      const weat = response.data.current.weather[0].description;
      let cuaca = null;
      switch(weat) {
        case 'clear sky':
          cuaca = 'Cerah';
          setWeatherIcon(faSun);
          setBackground(0);
        case 'few clouds':
          cuaca = 'sedikit berawan'
          setWeatherIcon(faCloudSun);
          setBackground(1);
        case 'shower rain':
          cuaca = 'Hujan lebat'
          setWeatherIcon(faCloudShowersHeavy);
          setBackground(2);
        case 'rain':
          cuaca = 'Hujan'
          setWeatherIcon(faCloudSunRain);
          setBackground(2);
        case 'thunderstrom':
          cuaca = 'Hujan badai'
          setWeatherIcon(faBolt);
          setBackground(2);
        case 'overcast clouds':
          cuaca = 'Mendung berawan'
          setWeatherIcon(faCloud);
          setBackground(1);
      }
      setWeather({temp: temp, weather: cuaca});
    })
    .catch ( e => {
      alert(e.toString());
    });
  }

  useEffect( () => {
    getWeather();
  }, [])


  return (
    <>
    <div id='weather'>
      <div id='weather-icon'>
        <FontAwesomeIcon icon={weatherIcon} size='5x'/>
      </div>
      <div id='weather-info'>
        {weather.weather + ', ' + weather.temp + '\u00b0C'}
      </div>
    </div>
    <div id="jam">
      <div id='tanggal'>
        <Moment interval={1000} format='DD MMMM YYYY' locale='id'/>
      </div>
      <div id="waktu">
        <Moment interval={1000} format='hh:mm:ss'/>
      </div>
      <div id='hari'>
        <Moment interval={1000} format='dddd' locale='id'/>
      </div>
    </div>
      {renderSwitch(background)}
    </>
  );
}

export default App;
