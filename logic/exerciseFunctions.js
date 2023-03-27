const readExercise = require("../store/readExercise")
const updateExercise = require("../store/updateExercise")
const writeExercise = require("../store/writeExercise")
const { getDuration, getPublicName } = require("./commonFunctions")

exports.parseExerciseBody = async (body) => {
    const exercises = await writeExercise(body)
    console.log('logic: ', exercises)
    return exercises
}

exports.parseUpdateBody = async (body, id) => {
    const currentString = await readExercise()
    const currentJson = JSON.parse(currentString)
    const currentSession = currentJson.exercises.filter(session => parseInt(id) === session.id)[0]
    let updatedSession = {...currentSession}
    const newData = currentJson.exercises.map(session =>{
        if(session.id === parseInt(id)){
            for(let key in body){
                updatedSession = {...updatedSession, [key]: body[key]}
            }
            return updatedSession
        } else {
            return session
        }
    })
    const updatedErr = await updateExercise({"exercises": newData})
    return updatedErr ? 'error' : updatedSession
}