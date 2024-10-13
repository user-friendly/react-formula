import {setupWorker} from 'msw/browser'
import Example from './handlers/Example'

const Browser = setupWorker(...Example)

export default Browser
