import React, {useState, useEffect} from 'react';
import config from '../../config.js';

const LocalParkCard = (props) => { // props will include id from DB corresponding to API
  const [parkName, setParkName] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [weather, setWeather] = useState({});
  const [AQI, setAQI] = useState('');
  const [aqiColor, setAqiColor] = useState('');
  
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
  
  // , temperature: Math.floor((main.temp + 273.15) * (9/5) + 32)
  useEffect(() => {
    // fetch to beach api
    const currentBeach = JSON.parse(localStorage.getItem('beaches')).find((beach) => beach.ID === props.parkId);
    console.log(currentBeach)
    setParkName(currentBeach.NameMobileWeb);
    setImgUrl(currentBeach.Photo_1);
    // fetch for weather info
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${currentBeach.LATITUDE}&lon=${currentBeach.LONGITUDE}&appid=${config.weatherAPI}`)
      .then((res) => res.json())
      .then((weatherData) => {
        setWeather({weather: weatherData.weather[0].main, temp: Math.floor((weatherData.main.temp - 273.15) * (9/5) + 32)});
      }).catch(err => { throw new Error(err) });
      // fetch to AQI api
      fetch(`https://api.waqi.info/feed/geo:${currentBeach.LATITUDE};${currentBeach.LONGITUDE}/?token=${config.aqiAPI}`)
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
  }, []);

  return (
  <div className='card'
    id="beachCard" 
    style={{width: '9rem', minWidth: "19rem"}}>
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
      <div className ="aqi-info" style={{backgroundColor: aqiColor, padding: '1em', borderRadius: '5px'}}>
        <p className='card-text' style={{fontWeight: 'bold'}}>AQI: {AQI}</p>
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