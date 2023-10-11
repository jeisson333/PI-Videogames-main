import React from 'react';
import Card from '../Card/Card';
import styles from './Cards.module.css';

const Cards = ({ allVideoGames }) => {
  return (
    <div className={styles.cards}>
      {allVideoGames.map((vg) => (
        <Card
          key={vg.id}
          id={vg.id}
          image={vg.image}
          name={vg.name}
          platforms={vg.platforms}
          rating={vg.rating}
          genres={vg.genres}
        />
      ))}
    </div>
  );
};

export default Cards;
