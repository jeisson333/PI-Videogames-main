const { Router } = require('express');
const {usersHandler,detailUsersHandler,createUsersHandler,editUserHandler,deleteUserHandler} = require('../handlers/usersHandler')


const router = Router();

router.get("/", usersHandler)
router.get("/:id",detailUsersHandler)
router.post("/", createUsersHandler)
router.put("/:id", editUserHandler)
router.delete("/:id", deleteUserHandler)

module.exports = router;

    