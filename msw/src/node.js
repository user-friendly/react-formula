import {setupServer} from 'msw/node'
import example from './handlers/example.js'

const node = setupServer(...example)

export default node
