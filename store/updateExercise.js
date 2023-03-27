const fs = require('fs')

const updateExercise = (updatedData) => {
    const dataString = JSON.stringify(updatedData)
    return fs.promises.writeFile('./store/exerciseData.json', dataString,(err)=>{
        throw new Error('write error')
    })
}
module.exports = updateExercise
