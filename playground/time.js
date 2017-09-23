const moment = require('moment')
// Jan 1st 1970 00:00:00 am
// in case of negative number we go to the past
let date = moment()
date.add(100000, 'year').subtract(2345, 'months')
console.log(date.valueOf())
console.log(date.format('DD MMMM YYYY'))

let myDate = moment()
console.log(myDate.format('h:mm a'))


let createdAt = 1234
let createdAtDate = moment(createdAt)
console.log(createdAtDate.format('h:mm a'))