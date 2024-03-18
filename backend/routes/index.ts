import express from 'express'

const route = express.Router()

route.use('/user', require('./user.route'))
route.use('/course', require('./course.route'))
route.use('/data-course', require('./dataCourse.route'))
route.use('/question', require('./question.route'))
route.use('/review', require('./review.route'))
route.use('/order', require('./order.route'))
route.use('/notification', require('./notification.route'))
route.use('/analytic', require('./analytics.route'))
route.use('/layout', require('./layout.route'))
module.exports = route
