'use strict'

import Hapi from '@hapi/hapi'
import { routes } from './api/routes/routes'

export const init = async(): Promise<void> => {
  const server = Hapi.server({
    port: 5000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*']
      }
    }
  })

  server.route(routes)

  console.log('Server starting')
  await server.start()
}
