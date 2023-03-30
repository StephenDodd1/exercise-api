const fs = require('fs')

const readExerciseList = () => {
    return fs.promises.readFile('./store/exerciseListData.json', 'utf-8', (err,data)=>{
        console.log(data)
        if(!err) {
            const parsed = JSON.parse(data)
            return parsed.exercises
        }
    })
}

module.exports = readExerciseList