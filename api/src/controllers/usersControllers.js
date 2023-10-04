const {User} = require('../db')



const createUserDB = async(email,password,name) =>{
    return await User.create({email,password,name});
}
const allUsers = async() => await User.findAll();
const nameUser = async(name) => await User.findAll({where: {name}});

const detailUserDB = async(id) =>{
    return await User.findByPk(id)
}

const updateUser = async (id,email,password,name) =>{
    return await User.update({email,password,name}, {where: {id}})
    
}

const deleteUser = async (id) =>{
    
    return 'Se elimino [' + await User.destroy({where: {id}}) + '] usuario';
}



module.exports = {
    createUserDB,
    detailUserDB,
    allUsers,
    nameUser,
    updateUser,
    deleteUser
}

