import React, {useEffect, useState} from 'react';
import LocalParkCard from './LocalParkCard.jsx';
// import {data} from '../../beaches.js';

const LocalParks = (props) => {
  // console.log('local parks', props.location)
  const [localBeaches, setLocalBeaches] = useState([]);

  useEffect(() => {
    // if beaches have not been fetched, get them and save in localStorage
    if (!localStorage.getItem('beaches')) {
    fetch(`https://api.coastal.ca.gov/access/v1/locations`)
      .then((beaches) => beaches.json())
      .then((data) => {
        localStorage.setItem('beaches', JSON.stringify(data))
      })
      .catch((err) => { throw new Error(err) });
    }
    setTimeout(() => {
      // console.log('stored', JSON.parse(localStorage.getItem('beaches')));
      // filter beaches in localStorage to get those near user
      const nearbyBeaches = JSON.parse(localStorage.getItem('beaches')).filter((beach) => {
        return (Math.abs(beach.LONGITUDE - props.location.longitude) < .2
          && Math.abs(beach.LATITUDE - props.location.latitude) < .2);
      })
      const cardHolder = [];
      for (let i = 0; i < Math.min(nearbyBeaches.length, 5); i++){
        cardHolder.push(<LocalParkCard parkId={nearbyBeaches[i].ID} key={nearbyBeaches[i].ID} localBtnHandler={localBtnHandler}/>)
      }
      setLocalBeaches(cardHolder);
    }, 500)
  }, [props.location]);
  
  const localBtnHandler = (id) => {
    console.log('localParksId', id)
    fetch('/trails/interested', {
      method: 'POST',
      headers: {'Content-Type': 'application/json; charset=UTF-8'},
      body: JSON.stringify({user_id: sessionStorage.getItem('user_id'), trail_id: id})
    })
      .then(() => {
        // fetch table to reset state to rerender here
      }) 
  }

  return (
    <div className="card-set">
    <h2 className="card-holder-label">Local</h2>
      <div className="cardHolder">
      <div className="scroll-div">
        {localBeaches}
        </div>
      </div>
    </div>
  )
};

export default LocalParks;