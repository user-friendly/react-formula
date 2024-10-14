import {setupWorker} from 'msw/browser'

import Example from './handlers/Example'

import MessageBoard from './handlers/CRUD/MessageBoard'

const Browser = setupWorker(...Example, ...MessageBoard)

export default Browser
