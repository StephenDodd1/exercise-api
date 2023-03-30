const fs = require('fs')

const readUser = () => {
    return fs.promises.readFile('./store/userData.json', 'utf-8', (err, data) => {
        console.log(data)
        if(!err){
            return user
        } else {
            console.log('err ', err)
        }
    })
}
module.exports = readUser