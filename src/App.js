import React, {useState, useEffect, useRef} from 'react';
import Moment from 'react-moment';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloud, faSun, faCloudSunRain, faCloudRain, faCloudSun, faCloudShowersHeavy, faMoon, faBolt, faHeart, faPlayCircle, faPauseCircle, faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons'

import 'moment-timezone';
import 'moment/locale/id';

import Clouds from './Backgrounds/Clouds';
import Wave from './Backgrounds/Wave';
import Rain from './Backgrounds/Rain';
import Stars from './Backgrounds/Stars';
import './css/App.css';
import moment from 'moment-timezone';

function App() {

  const [background, setBackground] = useState(0);
  const [clock, setClock] = useState(null);
  const num_of_background = 4;
  const [weather, setWeather] = useState({
    temp: null,
    weather: null,
  })
  const [bgIcon, setBgIcon] = useState(faSun);
  const [currentLocation, setCurrentLocation] = useState('Surabaya');
  const [weatherIcon, setWeatherIcon] = useState(faSun);
  const [greeting, setGreeting] = useState('おはよう');
  const [titleGreet, setTitleGreet] = useState(null);
  const [titleQuotes, setTitleQuotes] = useState({'text': null, 'author': null});
  const [shuffledSong, setShuffledSong] = useState([]);
  const [currSong, setCurrSong] = useState(0);
  const [isPlay, setIsPlay] = useState(false);
  const [mendung, setMendung] = useState(false);
  const player = useRef(null);

  const pagi = [
    'Selamat pagi',
    'Semangat pagi',
    'Ayo semangat',
    'Awali harimu dengan senyuman',
    'Good morning'
  ];
  const siang = [
    'Walau siang harus tetap semangat',
    'Selamat siang',
    'Tetap semangat',
    'Good afternoon'
  ];

  const sore = [
    'Penikmat senja',
    'Good evening',
    'Saatnya santai sejenak',
    'Nikmati waktu istirahatmu'
  ];

  const quotes = [
    {'text': 'Ketika kau bekerja keras dan gagal, penyesalan itu akan cepat berlalu. Berbeda dengan penyesalan ketika tidak berani mencoba.', 'author': 'Akihiko Usami (Junjou Romantica)'},
    {'text': 'Mula-mula, kau harus merubah dirimu sendiri, atau tidak akan ada yang berubah untukmu.', 'author': 'Gintoki (Gintama)'},
    {'text': 'Sejujurnya, hanya ada sedikit arti di balik nama yang orang tuamu berikan. Apa yang lebih berarti adalah, yang orang tuamu lakukan di balik nama itu selama kehidupannya.', 'author': 'Korosensei (Assassination Classroom)'},
    {'text': 'Air mata adalah cara bagi hati untuk bicara, ketika bibir tak bisa mengungkapkan betapa kita merasakan sakit yang sangat.', 'author': 'Jellal Fernandes (Fairy Tail)'},
    {'text': 'Jangan hanya berpikir tentang apa yang telah hilang darimu, kau takkan bisa mengambilnya kembali. Pikirkan apa yang masih kau miliki.', 'author': 'Jinbe (One Piece)'},
    {'text': 'Manusia adalah makhluk yang perkasa, karena kita memiliki kemampuan untuk merubah diri kita sendiri.', 'author': 'Saitama (One Punch Man)'},
    {'text': 'Lebih baik dibenci karena menjadi dirimu sendiri, daripada dicintai karena menjadi orang lain.', 'author': 'Hachiman (Oregairu)'},
    {'text': 'Yare Yare Daze', 'author': 'Jotaro Kujo'},
    {'text': 'OH MY GOD!', 'author': 'Joseph Joestar'},
    {'text': 'HOLY SHIT!', 'author': 'Joseph Joestar'},
    {'text': 'SON OF A BITCH!', 'author': 'Joseph Joestar'},
    {'text': 'YOU\'RE ALREADY DEAD', 'author': 'Guts'},
    {'text': 'Me and you, can we be friends?', 'author': 'Shouko Nishimiya (Silent Voice)'},
    {'text': 'Aku mempertaruhkan hatiku untuk mengatakan sesuatu yang bisa berpengaruh', 'author': 'Akihito Kanbara (Kyoukai no Kanta)'},
    {'text': 'Jika hanya itu hubungan yang kami miliki, mungkin akan menjadi mustahil untuk mengakhiri cerita yang ada di dalam dunia kita ini.', 'author': 'Akihito Kanbara (Kyoukai no Kanta)'},
    {'text': 'Kau tidak akan menemukan alasan yang bagus dengan mengelap kacamata.', 'author': 'Akihito Kanbara (Kyoukai no Kanta)'},
    {'text': 'Aku tidak suka merepotkan.', 'author': 'Kuriyama Mirai (Kyoukai no Kanta)'},
    {'text': 'Aku bukan tipe orang yang suka bersosialisasi', 'author': 'Kuriyama Mirai (Kyoukai no Kanta)'},
    {'text': 'Seorang gadis tanpa kacamata itu seperti shortcake tanpa strawberry di atasnya!', 'author': 'Akihito Kanbara (Kyoukai no Kanta)'},

    // {'text': '', 'author': '()'},
  ]


  function renderSwitch(param) {
    switch (param) {
      case 0:
        return <Wave time={mendung?'cloud':'sunset'}/>
      case 1:
        return <Wave time={mendung?'cloud':'bright'}/>
      case 2:
        return <Rain/>
      case 3:
        return <Stars/>
      default:
        return <Wave time='bright'/>
    }
  }
  function getWeather(long=112.768845, lat=-7.250445) {
    axios({
      method: 'get',
      url: 'https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+long+'&units=metric&appid=c2ca00558e33de38624a93e41701c43c',
    })
    .then ( response => {
      const temp = response.data.current.temp;
      const weat = response.data.current.weather[0].description;
      const now = moment(new Date()).format('HH');
      let quo = quotes[Math.floor(Math.random() * quotes.length)]
      setTitleQuotes({'text': quo.text, 'author': quo.author});

      if (now < 12) {
        setGreeting('おはよう');
        setTitleGreet(pagi[Math.floor(Math.random() * pagi.length)]);
        gantiBg(weat, 'pagi', temp);
      } else if (now < 18) {
        setGreeting('こんにちは');
        setTitleGreet(siang[Math.floor(Math.random() * siang.length)]);
        gantiBg(weat, 'siang', temp);
      } else {
        setGreeting('こんばんは');
        setTitleGreet(sore[Math.floor(Math.random() * sore.length)]);
        gantiBg(weat, 'malam', temp);
        setBgIcon(faMoon);
      }
    })
    .catch ( e => {
      alert(e.toString());
    });
  }

  function gantiBg(param, kondisi, temp) {
    let cuaca = null;
    switch(param) {
      case 'clear sky' :
        cuaca = 'Cerah';
        setWeatherIcon(faSun);
        if (kondisi === 'pagi') {
          setBackground(0);
        } else if (kondisi === 'siang') {
          setBackground(1);
        } else {
          setBackground(3);
        }
      case 'few clouds':
        cuaca = 'sedikit berawan'
        setWeatherIcon(faCloudSun);
        if (kondisi === 'pagi') {
          setBackground(1);
        } else if (kondisi === 'siang') {
          setBackground(1);
        } else {
          setBackground(3);
        }
      case 'shower rain':
        cuaca = 'Hujan lebat'
        setWeatherIcon(faCloudShowersHeavy);
        setBackground(2);
      case 'rain':
        cuaca = 'Hujan'
        setWeatherIcon(faCloudSunRain);
        setBackground(2);
      case 'light rain':
        cuaca = 'Hujan ringan'
        setWeatherIcon(faCloudRain);
        setBackground(2);
      case 'moderate rain':
        cuaca = 'Hujan sedang'
        setWeatherIcon(faCloudRain);
        setBackground(2);
      case 'thunderstrom':
        cuaca = 'Hujan badai'
        setWeatherIcon(faBolt);
        setBackground(2);
      case 'overcast clouds':
        cuaca = 'Mendung berawan'
        setWeatherIcon(faCloud);
        setMendung(true);
        if (kondisi === 'malam') {
          setBackground(3);
        } else {
          setBackground(1);
        }
    }
    setWeather({temp: temp, weather: cuaca});
  }

  useEffect( () => {
    getWeather();
    setShuffledSong(shuffle(songs));
    player.current.load();
    player.current.play();
    setIsPlay(true);
    getLocation()
  }, [])

  useInterval(() => {
    getWeather();
  }, 1000 * 60);

  window.onload = () => {
    player.current.onended = () => {
      nextSong()
    }
  }

  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
  function nextSong() {
    if (currSong !== songs.length - 1) {
      setCurrSong(currSong + 1);
    } else {
      setCurrSong(0);
    }
    player.current.load();
    player.current.play();
  }

  const songs = [
    'songs/1.mp3',
    'songs/2.mp3',
    'songs/3.mp3',
    'songs/4.mp3',
    'songs/5.mp3',
  ]

  function playPause() {
      if (player.current.paused) {
        player.current.play();
        setIsPlay(true);
      } else {
        player.current.pause()
        setIsPlay(false);
      }
  }

  function prevSong() {
    if (currSong === 0) {
      setCurrSong(songs.length - 1);
    } else {
      setCurrSong(currSong - 1);
    }
    player.current.load();
    player.current.play();
  }

  function getLocation () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  function showPosition(position) {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    getWeather(long,lat);
    changeLocation(long, lat);
  }

  function changeLocation(long=112.768845, lat=-7.250445) {
    axios({
      method: 'get',
      url: 'https://nominatim.openstreetmap.org/reverse?format=json&lat='+lat+'&lon=' + long,
    })
    .then(response => {
      setCurrentLocation(response.data.address.city);
    })
    .catch(e => {
      console.log(e);
    });
  }

  return (
    <>
    <audio ref={player}>
      <source src={shuffledSong[currSong]}/>
    </audio>
    <div id='bg-icon'>
      <FontAwesomeIcon icon={bgIcon} size='10x'/>
    </div>
    <div id='title-japan'>{greeting}</div>
    <div id='weather'>
      <div id='weather-icon'>
        <FontAwesomeIcon icon={weatherIcon} size='5x'/>
      </div>
    <div id='weather-location'>{currentLocation}</div>
      <div id='weather-info'>
        {weather.weather + ', ' + weather.temp + '\u00b0C'}
      </div>
    </div>
    <div id="jam">
      <div id='jam-wrapper'>
        <div id='tanggal'>
          <Moment interval={1000} format='DD MMMM YYYY' locale='id'/>
        </div>
        <div id="waktu">
          <Moment interval={1000} format='HH:mm:ss'/>
        </div>
        <div id='hari'>
          <Moment interval={1000} format='dddd' locale='id'/>
        </div>
      </div>
      <div id='title-indo'>{titleGreet} <FontAwesomeIcon icon={faHeart} style={{'color': '#d71149'}}/></div>
      <div id='btn-player'><FontAwesomeIcon icon={faChevronLeft} size='2x' onClick={() => prevSong()}/><FontAwesomeIcon style={{'margin': '0px 10px'}} onClick={() => playPause()} icon={isPlay?faPauseCircle:faPlayCircle} size='2x'/><FontAwesomeIcon onClick={() => nextSong()} icon={faChevronRight} size='2x'/></div>
    </div>
    <div id='quote'>
      <div id='quote-text'>{titleQuotes.text}</div>
      <div id='quote-author'>{titleQuotes.author}</div>
    </div>
      {renderSwitch(background)}
    </>
  );
}

function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    let id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
}

export default App;
