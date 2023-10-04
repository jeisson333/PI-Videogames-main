const { json } = require('body-parser');
const { createUserDB, detailUserDB, allUsers, nameUser, updateUser, deleteUser } = require('../controllers/usersControllers')





const usersHandler = async (req, res) => {
    try {

        const { name } = req.query;
        const getUser = await allUsers();
        if (!name) return res.status(200).json(getUser)
        const users = await nameUser(name)
        if (users.length === 0) return res.status(200).json(getUser)
        return res.status(200).json(users)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}
const detailUsersHandler = async (req, res) => {
    try {

        const { id } = req.params;

        if (!id) return { error: "No existen usuarios con ese id" };
        const response = await detailUserDB(id)
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

const createUsersHandler = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        if (!email || !password || !name) return res.status(400).send("incomplete data!")
        const response = await createUserDB(email, password, name);

        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

const editUserHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const { email, password, name } = req.body;

        if (!id) throw Error('Id es obligatorio');

        const user = await updateUser(id, email, password, name)

        return res.status(200).json(user)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
const deleteUserHandler = async (req,res) => {
    try {
        const { id } = req.params;
        if (!id) throw Error('Id es obligatorio');
        const user = await deleteUser(id);
        return res.status(200).json(user)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}


module.exports = {
    usersHandler,
    detailUsersHandler,
    createUsersHandler,
    deleteUserHandler,
    editUserHandler
}