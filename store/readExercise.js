const fs = require('fs')

const readExercise =() =>{
    return fs.promises.readFile('./store/exerciseData.json', 'utf-8', (err, data) =>{
        if(!err){
            console.log('test data',data)
            return data
        } else{
            console.log(err)
        }
    })
}

module.exports = readExercise