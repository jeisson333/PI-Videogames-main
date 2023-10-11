import React from 'react'
import style from './Card.module.css'
import { Link } from 'react-router-dom';

export const Card = ({id,name,platforms,rating,genres,image}) => {
  return (
    <div  className={style.card}> 
      <div className={style.cardContent}>
        
        <h3>{name}</h3>
        <Link to={`/details/${id}`}>
         <img src={image} alt={name} className={style.cardImage}/>
        </Link>
        
      </div>
      <div>
        <h5>Platforms: {platforms}</h5>
        <h5>Rating: {rating}</h5>
        <h5>Genres: {genres}</h5>
        

      </div>
    </div>
  )
}

export default Card;
