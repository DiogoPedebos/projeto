import express from 'express'
import route1 from './route.js'

const routes = express.Router()

routes.use(route1)
// routes.use(route2)

export default routes
