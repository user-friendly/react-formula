import {setupWorker} from 'msw/browser'

import Example from './handlers/Example'

import MessageBoard from './handlers/CRUD/MessageBoard'
import Furniture from './handlers/CRUD/Furniture'
import Todo from './handlers/CRUD/Todo'

const Browser = setupWorker(...Example, ...MessageBoard, ...Furniture, ...Todo)

export default Browser
