
import UsersHandler from './Users'

const ENDPOINT_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/learning-api/demos/capstone`

export default [
	...UsersHandler(ENDPOINT_BASE_URL)
]
