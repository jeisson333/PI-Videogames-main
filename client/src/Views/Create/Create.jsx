import React, { useEffect, useState } from 'react';
import styles from './Create.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getGenres, postVideoGame } from '../../Redux/Actions/actions';
import Navbar from '../../Components/Navbar/Navbar';

const Create = () => {

  const dispatch = useDispatch();

  const allGenres = useSelector((state) => state.allGenres); 
  
  
  useEffect(()=>{
    dispatch(getGenres());
  },[])

  const [state, setState] = useState({
    name: "",
    platforms: [],
    image: "",
    rating: 0,
    genres: [],
    releaseDate: "",
    description: ""

  })
  const [errors, setErrors] = useState({
    name: "",
    platforms: "Formulario incompleto!",
    image: "",
    rating: "",
    genres: "",
    releaseDate: "",
    description: ""
    

  })
  const validate = (state,name)=>{
    if(name === "name"){
      if(state.name === ""){
        setErrors({...errors,name: `Campo ${name} requerido`})
      }
      else{
        setErrors({...errors,name: ""})
      }
    }
    else if(name === "platforms"){
      
    }
    else if(name === "image"){
      
    }
    else if(name === "rating"){
      
    }
    else if(name === "genres"){
      
    }
  }

  const handleChange = (event) => {
    if (event.target.name === "platforms") {
      setState({
        ...state,
        platforms: [...state.platforms, event.target.value]
      })
    }
    else if (event.target.name === "genres") {
      setState({
        ...state,
        genres: [...state.genres, event.target.value]
      })
    }
    else {
      setState({
        ...state,
        [event.target.name]: event.target.value
      })

    }
    validate({
      ...state,
      [event.target.name]: event.target.value
    },event.target.name)
  }

  const disableFunction = ()=>{
    let disabledAux = true;
    for(let error in errors){
      if(errors[error]==="") return disabledAux = false
      else{
        return disabledAux = true;
        
      }
    }
  }

  const platforms = ["Nintendo 3DS", "Android", "iOS", "Nintendo Switch", "PlayStation 4"];
  const genresM = allGenres.map((g) => g.name)
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(postVideoGame(state));
  }



  const mostrarDatos = (dato) =>{
    return dato.map(g => g + " - ");
  }
  
  return (
      <div>
        <Navbar /> 
    <div className={styles['form-container']}>
      
      <form onSubmit={handleSubmit}>
        <div className={styles['input-container']}>
          <label className={styles['form-label']}>Name:</label>
          <input name='name' onChange={handleChange} type="text" className={styles['form-input']} />
          <label className={styles['form-label']}>Platforms: {<div>{mostrarDatos(state.platforms)}</div>}</label>
          <select name="platforms" onChange={handleChange} className={styles['form-select']}>
            {platforms.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          <label className={styles['form-label']}>Image:</label>
          <input name='image' onChange={handleChange} type="text" id="image" className={styles['form-input']} />
          <label className={styles['form-label']}>Rating:</label>
          <input name='rating' onChange={handleChange} type="text" id="rating" className={styles['form-input']} /> 
          <label className={styles['form-label']}>Release Date:</label>
          <input name='releaseDate' onChange={handleChange} type="date" id="releaseDate" className={styles['form-input']} />
          <label className={styles['form-label']}>Genres: {<span>{mostrarDatos(state.genres)}</span>} </label>
          <select name="genres" onChange={handleChange} className={styles['form-select']}>
            {genresM.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
          <label className={styles['form-label']}>Description:</label>
          <input name='description' onChange={handleChange} type="text" id="description" className={styles['form-input']} />

          <p className={styles['error-message']}>{errors.name}</p>
          
          <input disabled={disableFunction()} type="submit" className={styles['form-button']} />
        
        </div>
      </form>
      </div>
    </div>
  );
};

export default Create;



