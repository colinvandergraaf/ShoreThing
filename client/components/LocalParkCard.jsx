import React, {useState, useEffect} from 'react';
import config from '../../config.js';

const LocalParkCard = (props) => { // props will include id from DB corresponding to API
  const [parkName, setParkName] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [weather, setWeather] = useState({});
  const [AQI, setAQI] = useState('');
  const [numVisits, setNumVisits] = ('');
  
  const weatherMap = {
    Clouds: '../assets/cloud.svg',
    Clear: '../assets/sunny.svg',
    Rain: '../assets/rain.svg',
    Drizzle: '../assets/drizzle.svg',
    Snow: '../assets/snowflake.svg',
    Haze: '../assets/foggy.svg',
  };
  
  // , temperature: Math.floor((main.temp + 273.15) * (9/5) + 32)
  useEffect(() => {
    // fetch to beach api
    const currentBeach = JSON.parse(localStorage.getItem('beaches')).find((beach) => beach.ID === props.parkId);
    console.log(currentBeach)
    setParkName(currentBeach.NameMobileWeb);
    setImgUrl(currentBeach.Photo_1);
    // fetch(`https://api.coastal.ca.gov/access/v1/locations/id/${props.parkId}`)
    // .then((res) => res.json())
    // .then((park) => {
    //   setParkName(park[0].NameMobileWeb);
    //   setImgUrl(park[0].Photo_1);
      // fetch to weather api
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${currentBeach.LATITUDE}&lon=${currentBeach.LONGITUDE}&appid=${config.weatherAPI}`)
      .then((res) => res.json())
      .then((weatherData) => {
        setWeather({weather: weatherData.weather[0].main, temp: Math.floor((weatherData.main.temp - 273.15) * (9/5) + 32)});
      }).catch(err => { throw new Error(err) });
      // fetch to AQI api
      fetch(`https://api.waqi.info/feed/geo:${currentBeach.LATITUDE};${currentBeach.LONGITUDE}/?token=${config.aqiAPI}`)
      .then((res) => res.json())
      .then(({data}) => setAQI(data.aqi))
      .catch(err => {throw new Error(err)});
  }, []);

  return (
  <div className='card' id="beachCard" style={{minWidth: "19rem"}}>
    <div>
    {imgUrl.length > 0 ?
    <img src={imgUrl} id="card-top-image" className="card-img-top" style={{width: '75%'}} /> 
    : <img src='../../assets/beach.svg' id="card-top-image-placeholder" className="card-img-top" style={{width: '55%'}} />
    }
    </div>
      <div className="card-body">
      <h5 className="card-title" style={{wordWrap: 'break-word', whiteSpace: 'normal'}}>{parkName}</h5>
      <div className='info-container'>
      <div className="weather-info">
        <img src={weatherMap[weather.weather]} style={{width: '30%'}}/>
        <p className='card-text'>{weather.weather}</p>
        <p className='card-text'>Temp: {weather.temp} °F</p>
      </div>
      <div className ="aqi-info">
        <p className='card-text'>AQI: {AQI}</p>
      </div>
      </div>
      <div className="card-button-container">
        <button className="btn btn-secondary" onClick={() => props.localBtnHandler(props.parkId)}>Favorite?</button>
      </div>
    </div>   
  </div>
  )
};

export default LocalParkCard;

// GREEN: #009966
// YELLOW: #ffde33
// ORANGE: #ff9933
// RED: #cc0033
// PURPLE: #660099
// MAHOGANY: #7e0023