import {setupWorker} from 'msw/browser'

import Example from './handlers/Example'

import MessageBoard from './handlers/CRUD/MessageBoard'
import Furniture from './handlers/CRUD/Furniture'

const Browser = setupWorker(...Example, ...MessageBoard, ...Furniture)

export default Browser
