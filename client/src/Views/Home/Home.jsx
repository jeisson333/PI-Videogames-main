import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { orderVideoGamesAction, filterGenresAction, getGenres, getVideoGames, paginateVideoGames, getVideoGamesNAme } from '../../Redux/Actions/actions';
import Cards from '../../Components/Cards/Cards';
import styles from './Home.module.css';
import Navbar from '../../Components/Navbar/Navbar';

const Home = () => {
  const dispatch = useDispatch();
  const allVideoGames = useSelector((state) => state.allVideoGames);
  const allGenres = useSelector((state) => state.allGenres);

  const [searchVg,setSearchVg] = useState("");
  const handleChange = (event) =>{
    event.preventDefault();
    setSearchVg(event.target.value);
  }

  const handleSubmit = (event) =>{
    event.preventDefault();
    dispatch(getVideoGamesNAme(searchVg))
  }



  useEffect(() => {
    dispatch(getGenres());
    dispatch(getVideoGames());
  }, []);

  const paginate = (event) => {
    dispatch(paginateVideoGames(event.target.name));
  };

  const filterGenres = (event) => {
    dispatch(filterGenresAction(event.target.value));
  };

  const orderVideoGames = (event) => {
    dispatch(orderVideoGamesAction(event.target.value));
  };

  return (
    <div className={styles.homeContainer}>
      <Navbar handleChange={handleChange} handleSubmit={handleSubmit}/>
      <div className={styles.filtersSection}>
        <h3>Filtros/Ordenamiento: </h3>
        
        <select onClick={orderVideoGames} name="">
          <option value="Order">Order</option>
          <option value="A">A-Z</option>
          <option value="Z">Z-A</option>
          <option value="-">ALL</option>
        </select>
        <select onChange={filterGenres} name="genres">
          {allGenres.map((g) => (
            <option key={g.name} value={g.name}>
              {g.name}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.paginationSection}>
        <h4>Paginado: </h4>
        <button onClick={paginate} name='prev'>{"<"}</button>
        <button onClick={paginate} name='next'>{">"}</button>
      </div>
      <Cards allVideoGames={allVideoGames} />
      <div className={styles.paginationSection}>
        <button onClick={paginate} name='prev'>{"<"}</button>
        <button onClick={paginate} name='next'> {">"} </button>
      </div>
    </div>
  );
};

export default Home;


