require('dotenv').config();
const { API_KEY } = process.env;
const { Videogame, Genres } = require('../db')
const axios = require("axios");

const createVideogame = async (name, description, platforms, image, releaseDate, rating, genres) => {

    const newVideogame = await Videogame.create({ name, description, platforms, image, releaseDate, rating });

    for (const g of genres) {
        const genresDB = await Genres.findOne({ where: { name: g } });
        if (genresDB) {
            await newVideogame.addGenres(genresDB);
        } else {
            await Videogame.destroy({ where: { name, description, platforms, releaseDate, rating } })
            throw new Error(`El género "${g}" no se encontró en la base de datos.`);

        }
    }
    return newVideogame;
}
const getVideogameBd = async () => {
    return await Videogame.findAll();
}

const getVideogameApi = async () => {
    const { data } = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)

    const dataLimpia = data.results.map(dL => {
        const platforms = dL.platforms.map(platform => platform.platform.name);
        return {
            id: dL.id,
            name: dL.name,
            platforms: platforms,//dL.platforms[0].platform.name,
            image: dL.background_image,
            rating: dL.rating
        }

    })
    return dataLimpia;
}

const getVideogames = async (name) => {
    const videoGamesDd = await getVideogameBd();
    const videoGamesApi = await getVideogameApi();
    const allVideogames = [...videoGamesDd, ...videoGamesApi]
    return allVideogames;
}
const getVideogameId = async (id) => {

}

module.exports = {
    createVideogame,
    getVideogameBd,
    getVideogameApi,
    getVideogames,
    getVideogameId
}