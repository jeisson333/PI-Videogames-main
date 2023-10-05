const {Router} = require("express")
const {createVideogameHandler,videogameHandler,videogameIdHander} = require("../handlers/videogamesHandler")

const router = Router();

router.get("/", videogameHandler);
router.get("/:id",videogameIdHander)
router.post("/", createVideogameHandler);


module.exports = router;