import {setupWorker} from 'msw/browser'
import example from './handlers/example'

const browser = setupWorker(...example)

export default browser
