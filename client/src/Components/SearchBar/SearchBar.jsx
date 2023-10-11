import React from 'react';
import styles from './SearchBar.module.css';

const SearchBar = ({ handleChange, handleSubmit }) => {
  return (
    <div className={styles.searchcontainer}>
      <input
        className={styles.searchinput}
        placeholder="Search"
        onChange={handleChange}
        type="search"
      />
      <button className={styles.searchbutton} type="submit" onClick={handleSubmit}>
        🔍
      </button>
    </div>
  );
};

export default SearchBar;
