const writeEventLog = require("../writeEventLog")

// Take the start timestamp in unix time and subtract it from the
// stop time to get the duration of the activity.
exports.getDuration = (start, stop) =>{
    secondsDiff = stop-start
    remainderSeconds = secondsDiff % 60
    minutesDiff = Math.floor(secondsDiff / 60)
    remainderMinutes = minutesDiff % 60
    hoursDiff = Math.floor(minutesDiff / 60)
    return ('hours: '+ hoursDiff + ' minutes: ' + remainderMinutes + ' seconds: ' + remainderSeconds)
}

exports.getPublicName = (first, last) => {
    const pubName = first + ' ' + last[0] + '.'
    writeEventLog(pubName)
    return pubName
}