import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './Details.module.css';
import Navbar from '../../Components/Navbar/Navbar';

const Details = () => {
  const { id } = useParams();
  const [videogame, setVideoGames] = useState({});

  useEffect(() => {
    axios(`http://localhost:3001/videogames/${id}`)
      .then((response) => response.data)
      .then((data) => {
        if (data.name) {
          setVideoGames(data);
        } else {
          window.alert('No hay personajes con ese ID');
        }
      });
  }, [id]);

  return (
    <div>
      <Navbar/>
    
    
    <div className={styles.detailsContainer}>
      <div className={styles.infoContainer}>
        <h2>{videogame?.name}</h2>
        <div>
          <h4>Platforms: </h4> {videogame?.platforms?.join(', ')}
        </div>
        <div>
          <h4>Genres: </h4> {videogame?.genres?.join(', ')}
        </div>
        <div>
          <h4>Rating: </h4> {videogame?.rating}
        </div>
        <div>
          <h4>Release Date:</h4> {videogame?.releaseDate ? videogame?.releaseDate : videogame?.released}
        </div>
        <div className={styles.descriptionContainer}>
          <h4>Description:</h4>
          <p>{videogame?.description}</p>
        </div>
      </div>
      <div className={styles.imageContainer}>
        <img
          src={videogame?.image}
          alt={videogame?.name}
          className={styles.image}
        />
      </div>
    </div>
    </div>
  );
};

export default Details;








