const { Router } = require('express');
const {usersHandler,detailUsersHandler,createUsersHandler,editUserHandler,deleteUserHandler} = require('../handlers/usersHandler')


const router = Router();

router.get("/", usersHandler)
.get("/:id",detailUsersHandler)
.post("/", createUsersHandler)
.put("/:id", editUserHandler)
.delete("/:id", deleteUserHandler)

module.exports = router;

    