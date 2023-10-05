const {createVideogame,getVideogameBd,getVideogameApi,getVideogames,getVideogameId} = require('../controllers/videogamesControllers')

const createVideogameHandler = async(req,res)=>{
    try {
        const {name,description,platforms,image,releaseDate,rating,genres} = req.body;
        const response = await createVideogame(name,description,platforms,image,releaseDate,rating,genres);
        res.status(201).json(response)

    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}
const videogameHandler = async (req,res) =>{
    try {
        const response = await getVideogames();
        res.status(200).json(response);
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}
const videogameIdHander = async (req,res)=>{

}
module.exports = {
    createVideogameHandler,
    videogameHandler,
    videogameIdHander
}