const fs = require('fs')
const readUser = require('./readUser')

const writeSignup = async (user) => {
    const usersString = await readUser()
    const usersJson = JSON.parse(usersString)
    const id = usersJson.users.length
    user.id = id
    console.log(user)
    usersJson.users.push(user)
    console.log(usersJson)
    const updatedUsers = JSON.stringify(usersJson)
    console.log(updatedUsers)
    const success = await fs.promises.writeFile('./store/userData.json', updatedUsers,(err) => console.log(err))
    if(success){
        return 'success'
    }
}

module.exports = writeSignup