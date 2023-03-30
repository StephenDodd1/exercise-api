const readExerciseList = require("../store/readExerciseList")
const readUser = require("../store/readUser")


exports.getUserSpecificExerciseList = async (id) => {  
    const userString = await readUser(id)
    const userObj = JSON.parse(userString)
    const user = userObj.users.filter(user => user.id === parseInt(id))[0]
    const excluded = user.excluded_exercises
    const exercises = await readExerciseList()
    const exercisesJson = JSON.parse(exercises).exercises
    for(let ex in exercisesJson){
        if(excluded?.includes(ex)){
            delete exercisesJson[ex]
        }
    }
    return exercisesJson
}

exports.getExerciseList = async () => {
    const exercises = await readExerciseList()
    return exercises
}