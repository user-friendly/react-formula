
import {Dot2d, Dot3d, Len2d, Len3d} from './Linear'
import {VertexBuffer2d, VertexBuffer3d} from './Linear'

const s1 = MatrixMultiply3d(Identity3d(), [
	2, 0, 0, 0,
	0, 2, 0, 0, 
	0, 0, 2, 0,
	0, 0, 0, 1,
])

const t1 = MatrixMultiply3d(s1, [
	1, 0, 0, -2,
	0, 1, 0, 2, 
	0, 0, 1, 3.5,
	0, 0, 0, 1,
])

console.log(Matrix3dToString(t1))

const s2 = MatrixMultiply2d(Identity2d(), [
	2, 0, 0,
	0, 2, 0, 
	0, 0, 1,
])

const t2 = MatrixMultiply2d(s2, [
	1, 0, -2,
	0, 1, 2, 
	0, 0, 1,
])

console.log(Matrix2dToString(t2))

const Test = () => {
	
}

export default Tests
