const {Router} = require("express")
const {createVideogameHandler,videogameHandler,videogameIdHander,updateVideogameHandler,deleteVideogameHandler} = require("../handlers/videogamesHandler")

const router = Router();

router.get("/", videogameHandler)
.get("/:id",videogameIdHander)
.post("/", createVideogameHandler)
.put("/:id",updateVideogameHandler)
.delete("/:id",deleteVideogameHandler)


module.exports = router;