import { Router } from 'express'

import ClassesController from './controllers/ClassesController'
import ConnectionsController from './controllers/ConnectionsController'

const routes = Router()

routes.get('/classes', ClassesController.index)
routes.post('/classes', ClassesController.create)

routes.get('/connections', ConnectionsController.index)
routes.post('/connections', ConnectionsController.create)

export default routes