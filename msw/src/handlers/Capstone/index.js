
import UsersHandler from './Users'
import PlantsHandler from './Plants'
import CartHandler from './Cart'

const ENDPOINT_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/learning-api/demos/capstone`

export default [
	...UsersHandler(ENDPOINT_BASE_URL),
	...PlantsHandler(ENDPOINT_BASE_URL),
	...CartHandler(ENDPOINT_BASE_URL),
]
