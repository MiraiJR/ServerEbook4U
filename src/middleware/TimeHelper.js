const moment = require("moment")

const getArrayDate = (number, type) => {
    let result = []

    const start = moment().subtract(number, 'weeks').startOf(type)
    const end = moment().subtract(number, 'weeks').endOf(type)

    for (let m = moment(start); m.isBefore(end); m.add(1, 'days')) {
        result.push(m.format('DD-MM-YYYY'))
    }

    return result
}

module.exports = {
    getArrayDate
}