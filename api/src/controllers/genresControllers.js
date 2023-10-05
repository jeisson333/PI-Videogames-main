require('dotenv').config();
const {API_KEY} = process.env;
const {Genres} = require('../db');
const axios = require("axios");

const getAllGenres = async ()=>{
    const genresDb = await Genres.findAll();
    
    if(!genresDb.length){
        const {data} = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
        const genres = [];
        data.results.forEach( (e) => genres.push(e.name));
        genres.forEach(async (g) =>{
            await Genres.findOrCreate({
                where: {name: g}
            })
        })
        return genres;
    }
    return genresDb
}


module.exports = {getAllGenres}