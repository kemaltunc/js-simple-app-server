
const authRote = require('./AuthRoute')
const postRoutes = require('./PostRoutes')

module.exports = function (app) {
    app.use('/api/v1/users', authRote)
    app.use('/api/v1/post', postRoutes)
}