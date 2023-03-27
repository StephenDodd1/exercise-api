const fs = require('fs')
const writeEventLog = require('../writeEventLog')

// This function is to append a new exercise to our exercises
const writeExercise = async (data) => {
    let errFlag = false
    let allData = await fs.promises.readFile('./store/exerciseData.json', 'utf-8', (err, data) =>{
        if(err){
            console.log(err)
            errFlag = true
        } else return data
    }).catch(err => console.log('error on read'))

    let dataJson = JSON.parse(allData)
    console.log('dataJson', dataJson)
    dataJson.exercises.push(data)
    console.log('newData', dataJson)
    let stringData = JSON.stringify(dataJson)
    await fs.promises.writeFile('./store/exerciseData.json', stringData, (err) =>{
        console.log('error: ', err)
        if(err){
            errFlag = true
        }
    }).catch(err => console.log('error on write'))
    if(!errFlag){
        console.log('store: ', dataJson)
        return dataJson
    }
}

module.exports = writeExercise