import axios from 'axios';
import { FILTER, GET_GENRES,GET_VG_NAME,GET_VIDEOGAMES, ORDER, PAGINATE } from './action-types';

export const getGenres = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get("http://localhost:3001/genres");
            dispatch({
                type: GET_GENRES,
                payload: response.data
            })
        } catch (error) {
        }

    }
}

export const postVideoGame = (state) =>{
    return async (dispatch) =>{
        try {
            await axios.post("http://localhost:3001/videogames/", state)
            alert("Juego creado con exito!")
        } catch (error) {
            alert(error.response.data.error)
        }
    }
}

export const getVideoGames = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get("http://localhost:3001/videogames");
            dispatch({
                type: GET_VIDEOGAMES,
                payload: response.data
            })
        } catch (error) {
            alert(error.response.data.error)
        }

    }
}
export const paginateVideoGames = (order) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: PAGINATE,
                payload: order
            })
        } catch (error) {
            alert(error.response.data.error)
        }

    }
}
export const filterGenresAction = (vg ) => {
    return async (dispatch) => {
       
        try {
            dispatch({
                type: FILTER,
                payload: vg
            })
        } catch (error) {
            alert(error.response.data.error)
        }

    }
}
export const orderVideoGamesAction = (order ) => {
    return async (dispatch) => {
        
        try {
            dispatch({
                type: ORDER,
                payload: order
            })
        } catch (error) {
            alert(error.response.data.error)
        }

    }
}

export const getVideoGamesNAme = (name) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`http://localhost:3001/videogames?name=${name}`);
            dispatch({
                type: GET_VG_NAME,
                payload: response.data
            })
        } catch (error) {
            alert(error.response.data.error)
        }

    }
}



