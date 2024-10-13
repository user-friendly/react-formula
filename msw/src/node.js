import {setupServer} from 'msw/node'
import Example from './handlers/Example.js'

const node = setupServer(...Example)

export default node
