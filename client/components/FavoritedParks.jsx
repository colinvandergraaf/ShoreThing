import React, { useState, useEffect } from 'react';
import FavParkCard from './FavParkCard.jsx';
// import DummyCard from './DummyCard.jsx';

const FavoritedParks = () => {
  const [favBeaches, setFavBeaches] = useState([]);

  useEffect(() => {
    // request to retrieve favorite beaches
    fetch(`/trails/interested/${sessionStorage.getItem('user_id')}`)
      .then((favorites) => favorites.json())
      .then((data) => {
        console.log('what is data', data)
        setFavBeaches(data)
      })
      .catch((err) => { throw new Error(err) });
  }, []);

  const favoriteBtnHandler = (id) => {
    console.log('remove button clicked', id);
    fetch(`/trails/interested/${sessionStorage.getItem('user_id')}/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      body: JSON.stringify({ user_id: sessionStorage.getItem('user_id'), trail_id: id })
    })
      .then(() => {
        // fetch table to reset state to rerender here
        fetch(`/trails/interested/${sessionStorage.getItem('user_id')}`)
          .then((favorites) => favorites.json())
          .then((data) => {
            console.log('what is data', data)
            setFavBeaches(data)
          })
          .catch((err) => { throw new Error(err) });
      })
  };

  const refreshHandler = () => {
    // request to retrieve favorite beaches
    fetch(`/trails/interested/${sessionStorage.getItem('user_id')}`)
      .then((favorites) => favorites.json())
      .then((data) => {
        console.log('what is data', data)
        setFavBeaches(data)
      })
      .catch((err) => { throw new Error(err) });
  }

  const cardHolder = [];
  for (let i = 0; i < favBeaches.length; i++) {
    cardHolder.push(<FavParkCard key={favBeaches[i].trail_id} parkId={favBeaches[i].trail_id} favoriteBtnHandler={favoriteBtnHandler} />)
  }
  if (!cardHolder.length) return (
    <div style={{ paddingLeft: '1rem', marginTop: '1rem' }}>
      <button type="button" className="btn btn-info" onClick={() => refreshHandler()}>Refresh</button>
    </div>
  );
  return (
    <div className="card-set">
      <div >
        <div style={{ marginTop: '1rem' }}>
          <button type="button" className="btn btn-info" onClick={() => refreshHandler()}>Refresh</button>
        </div>
        <div style={{ marginTop: '1rem', paddingTop: '4rem' }}>
          <h2 className="card-holder-label">Favorites</h2>
        </div>
      </div>
      <div className="cardHolder">
        <div className="scroll-div">
          {cardHolder}
        </div>
      </div>
    </div>
  )
};

export default FavoritedParks;