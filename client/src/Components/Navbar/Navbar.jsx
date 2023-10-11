import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import styles from './Navbar.module.css';

const Navbar = ({handleChange,handleSubmit}) => {
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <nav className={styles.container}>
      
      <div className={styles.links}>
        <Link
        to="/"
          onClick={() => handleButtonClick('/')}
        ><h1 className={styles.logo}>Video Games</h1></Link>
        <Link
          to="/home"
          className={`${styles.btnNeon} ${activeButton === 'home' ? styles.active : ''}`}
          onClick={() => handleButtonClick('home')}
        >
          Home
        </Link>
        <Link
          to="/create"
          className={`${styles.btnNeon} ${activeButton === 'create' ? styles.active : ''}`}
          onClick={() => handleButtonClick('create')}
        >
          Create
        </Link>
      </div>
      <SearchBar handleChange={handleChange} handleSubmit={handleSubmit} />
    </nav>
  );
};

export default Navbar;




