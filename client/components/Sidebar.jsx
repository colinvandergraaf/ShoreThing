import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import config from '../../config.js';

const Sidebar = (props) => {
  const [weather, setWeather] = useState({});
  const [AQI, setAQI] = useState('');
  const history = useHistory();
  const [aqiColor, setAqiColor] = useState('')

  const weatherMap = {
    Clouds: '../assets/cloud.svg',
    Clear: '../assets/sunny.svg',
    Rain: '../assets/rain.svg',
    Drizzle: '../assets/drizzle.svg',
    Snow: '../assets/snowflake.svg',
    Haze: '../assets/foggy.svg',
    Mist: '../assets/mist.svg'
  };
  const colorMap = {
    GREEN: '#009966',
    YELLOW: '#ffde33',
    ORANGE: '#ff9933',
    RED: '#cc0033',
    PURPLE: '#660099',
    MAHOGANY: '#7e0023'
  }


  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${props.location.latitude}&lon=${props.location.longitude}&appid=${config.weatherAPI}`)
      .then((res) => res.json())
      .then((weatherData) => {
        console.log('weather data for lat/long', props.location.latitude, props.location.longitude, weatherData)
      setWeather({weather: weatherData.weather[0].main, temp: Math.floor((weatherData.main.temp - 273.15) * (9/5) + 32)});

    }).catch(err => { throw new Error(err) });
  
    // fetch to AQI api
    fetch(`https://api.waqi.info/feed/geo:${props.location.latitude};${props.location.longitude}/?token=${config.aqiAPI}`)
      .then((res) => res.json())
      .then(({data}) => {
        setAQI(data.aqi)
        if (data.aqi >= 0 && data.aqi <= 50){
          setAqiColor(colorMap.GREEN);
        }
        else if (data.aqi >= 51 && data.aqi <= 100){
          setAqiColor(colorMap.YELLOW);
        }
        else if (data.aqi >= 101 && data.aqi <= 150){
          setAqiColor(colorMap.ORANGE);
        }
        else if (data.aqi >= 151 && data.aqi <= 200){
          setAqiColor(colorMap.RED);
        }
        else if (data.aqi >= 201 && data.aqi <= 300){
          setAqiColor(colorMap.PURPLE);
        }
        else if (data.aqi >= 301 ){
          setAqiColor(colorMap.MAHOGANY);
        }
      })
      .catch(err => {throw new Error(err)});
  }, [props.location] );


  return (
  <div className="sidebar">
    <div>
      <h2 className="display-4" id="current-user">Hi, {sessionStorage.getItem('username')}</h2>
    </div>
    <div>
      <h2>Current Location: {props.zipcode}</h2>
    </div>
      {/* // change zip form */}
    <div>
      <form className="container" id="changeZip">
        <input type="zipcode" className="form-control" id="zipcode" placeholder="Enter Zipcode" />
        <button type="button" className="btn btn-primary" style={{marginLeft: '1em'}} onClick={() => props.zipcodeHandler()}>Submit</button>
      </form>
    </div>
    {/* // current weather svg + text */}
    <div className='card' id="sidebar-card">
      <img src={weatherMap[weather.weather]} className="card-img-top" id="weather-image"/>
      <h5 className='card-title'>Weather: {weather.weather}</h5>
      <h5 className='card-title'>Temp: {weather.temp}°F</h5>
    </div>
    {/* // current AQI svg + text */}
    <div className='card' id="sidebar-card2" style={{backgroundColor: aqiColor}}> 
      <h2 className='card-title'>AQI: {AQI}</h2>
    </div>

    {/* // sign out button */}
    <div>
      <button className='btn btn-primary' onClick={()=> {sessionStorage.clear(); history.push('/')}}>Sign Out</button>
    </div>
  </div>
  )
}

export default Sidebar;

{/* <div className='card' style={{width: "18rem"}}>
<div>
<img src={imgUrl} className="card-img-top" /> 
</div>
  <div className="card-body">
  <h5 className="card-title">{parkName}</h5>
  <div>
    <img src={weatherMap[weather.weather]} style={{width: '50%'}}/>
    <p className='card-text'>Weather: {weather.weather} Temp: {weather.temp} °F</p>
    <p className='card-text'>AQI: {AQI}</p>
  </div>
</div>   
</div> */}