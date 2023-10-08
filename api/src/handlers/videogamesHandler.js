const { createVideogame,deleeteVideoGrame, getVideogameBd, getVideogameApi, getVideogames, getVideogameId, putVideogame } = require('../controllers/videogamesControllers')

const createVideogameHandler = async (req, res) => {
    try {
        const { name, description, platforms, image, releaseDate, rating, genres,userid} = req.body;
        const response = await createVideogame(name, description, platforms, image, releaseDate, rating, genres,userid);
        res.status(201).json(response)

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}
const videogameHandler = async (req, res) => {
    try {
        const { name} = req.query;
        const response = await getVideogames(name);
        res.status(200).json(response);
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}
const updateVideogameHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await getVideogameId(id);
        await putVideogame(id, req.body);
        res.status(200).json(response);
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}
const videogameIdHander = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await getVideogameId(id);
        res.status(200).json(response);
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}
const deleteVideogameHandler = async (req,res)=>{
    try {
        const { id } = req.params;
   
    const response = await deleeteVideoGrame(id)
    res.status(200).json(response);
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}
module.exports = {
    createVideogameHandler,
    videogameHandler,
    videogameIdHander,
    updateVideogameHandler,
    deleteVideogameHandler
}