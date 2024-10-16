import {setupWorker} from 'msw/browser'

import Example from './handlers/Example'

import MessageBoard from './handlers/CRUD/MessageBoard'
import DeletingFurni from './handlers/CRUD/DeletingFurni'

const Browser = setupWorker(...Example, ...MessageBoard, ...DeletingFurni)

export default Browser
