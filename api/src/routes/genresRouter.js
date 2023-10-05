const {Router} = require("express")
const {getGenresHandler} = require("../handlers/genresHandler")
const router = Router();

router.get("/", getGenresHandler);

module.exports = router;