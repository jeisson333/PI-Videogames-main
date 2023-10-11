require('dotenv').config();
const { API_KEY } = process.env;
const { Videogame, Genres } = require('../db')
const axios = require("axios");

const createVideogame = async (name, description, platforms, image, releaseDate, rating, genres,userid) => {

    const newVideogame = await Videogame.create({ name, description, platforms, image, releaseDate, rating, UserId: userid});



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
    const dataDB = await Videogame.findAll({include: {
        model: Genres,
        attributes: ["name"],
        through: {
            attributes: []
        }
    }});
    const dataLimpia = dataDB.map((dL) => {
        const genresApi = dL.Genres.map(g => g.name);
        return {
            id: dL.id,
            name: dL.name,
            platforms: dL.platforms,
            image: dL.image,
            rating: dL.rating,
            genres: genresApi
        }

    })
    return dataLimpia;
}

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000;
const TIMEOUT_MS = 2000; // 20 segundos
const TOTAL_TIMEOUT_MS = 22000; // 20 minutos

const getVideogameApi = async () => {
    let allData = [];
    let i = 1;
    let retries = 0;
    let totalTimeElapsed = 0;

    const startTime = Date.now();

    while (i < 42726 && totalTimeElapsed < TOTAL_TIMEOUT_MS) {
        try {
            let timeoutId;
            const { data } = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`, {
                cancelToken: new axios.CancelToken((c) => {
                    // Configurar un temporizador
                    timeoutId = setTimeout(() => {
                        c('Request timeout'); // Cancelar la solicitud 
                    }, TIMEOUT_MS);
                }),
            });

            clearTimeout(timeoutId);
            allData = [...allData, ...data.results];
            i++;

            const currentTime = Date.now();
            totalTimeElapsed = currentTime - startTime;
        } catch (error) {
            if (retries < MAX_RETRIES || (error.response && error.response.status === 500)) {
                retries++;
                if (allData.length < 50) retries--; // Evitar reintentos indefinidos
                console.error(`Error 500 recibido, reintentando en ${RETRY_DELAY_MS / 1000} segundos...`);
                await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
            } else {
                console.log(`Total juegos cargados: ${allData.length}`);
                break;
            }
        }
    }

    const dataLimpia = allData.map(dL => {
        const platforms = dL.platforms.map(platform => platform.platform.name);
        const genresApi = dL.genres.map(g => g.name);
        return {
            id: dL.id,
            name: dL.name,
            platforms: platforms,
            image: dL.background_image,
            rating: dL.rating,
            genres: genresApi
        }
    })

    return dataLimpia;
};

(async () => {
    try {
        const result = await getVideogameApi();
        console.log(`Total de juegos cargados: ${result.length}`);
    } catch (err) {
        console.error('Error:', err);
    }
})();


const getVideogames = async (name) => {
    const videoGamesDd = await getVideogameBd();
    const videoGamesApi = await getVideogameApi();
    const allVideogames = [...videoGamesDd, ...videoGamesApi]

    if(name){
        const videoGamesFilter = allVideogames.filter(vg => vg.name.toLowerCase().includes(name.toLowerCase()))
        if(!videoGamesFilter.length) throw Error("no se encontro juego");
        return videoGamesFilter.splice(0,15)
    }
    return allVideogames;


}

const putVideogame = async (id, { name, description, platforms, image, releaseDate, rating, genres }) => {
    
    const updateVideogame = await Videogame.findByPk(id);
    await updateVideogame.setGenres([]);
    for (const g of genres) {
        const genreDB = await Genres.findOne({ where: { name: g } });
        if (genreDB) {
            await updateVideogame.addGenres(genreDB);
        } else {
            console.error(`El género "${g}" no se encontró en la base de datos.`);
        }
    }
    return Videogame.update({name, description, platforms, image, releaseDate, rating, genres}, {where: {id}})
}

const getVideogameId = async (id) => {
    if (id > 0) {
        const { data } = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
        if (!data) throw new Error(`No existe usuario con el id: "${id}.`);
        
            const platforms = data.platforms.map(platform => platform.platform.name);
            const genresApi = data.genres.map(g => g.name);
            return {
                id: data.id,
                name: data.name,
                platforms: platforms,
                image: data.background_image,
                released: data.released,
                rating: data.rating,
                description: data.description,
                genres: genresApi
            }
    }
    
    const videoGameId = await Videogame.findOne({
        where: { id },
        include: {
          model: Genres,
          attributes: ["name"],
          through: {
            attributes: []
          }
        }
      });

    

    if (!videoGameId) throw new Error(`No existe usuario con el id: "${id}.`);
        
        const genresApi = videoGameId.Genres.map(g => g.name);
        const dataLimpia = {
            id: videoGameId.id,
            name: videoGameId.name,
            platforms: videoGameId.platforms,
            image: videoGameId.image,
            rating: videoGameId.rating,
            releaseDate: videoGameId.releaseDate,
            genres: genresApi,
            description: videoGameId.description
        }

    return dataLimpia;
}
const deleeteVideoGrame = async (id)=>{
    return "Video Games Eliminados: " + await Videogame.destroy({where: {id}});

}
module.exports = {
    createVideogame,
    getVideogameBd,
    getVideogameApi,
    getVideogames,
    getVideogameId,
    putVideogame,
    deleeteVideoGrame
}