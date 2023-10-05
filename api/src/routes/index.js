const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const usersRouter = require('./usersRouter')
const genresRouter = require('./genresRouter')
const videoGamesRouter = require ('./videoGamesRouter')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/users",usersRouter)
router.use("/genres",genresRouter)
router.use("/videogames",videoGamesRouter)



module.exports = router;
