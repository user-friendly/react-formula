/**
 * Linear algebra operations.
 */

const Dot2d = (a, b) => {
	return a.x*b.x + a.y*b.y
} 

const Dot3d = (a, b) => {
	return a.x*b.x + a.y*b.y + a.z*b.z
}

const Len2d = (a) => {
	return Math.sqrt(a.x * a.x + a.y * a.y)
}

const Len3d = (a) => {
	return Math.sqrt(a.x * a.x + a.y * a.y + a.z * a.z)
}

const Identity2d = () => [
	1, 0, 0,
	0, 1, 0,
	0, 0, 1,
]

const Identity3d = () => [
	1, 0, 0, 0,
	0, 1, 0, 0,
	0, 0, 1, 0,
	0, 0, 0, 1,
]

const MatrixMultiply2d = (A, B) => {
	if (typeof B === 'number') {
		A.forEach((n, i, ary) => ary[i] = n*B)
		return A
	}
	return [
		(A[0]*B[0] + A[1]*B[3] + A[2]*B[6]), (A[0]*B[1] + A[1]*B[4] + A[2]*B[7]), (A[0]*B[2] + A[1]*B[5] + A[2]*B[8]),
		(A[3]*B[0] + A[4]*B[3] + A[5]*B[6]), (A[3]*B[1] + A[4]*B[4] + A[5]*B[7]), (A[3]*B[2] + A[4]*B[5] + A[5]*B[8]),
		(A[6]*B[0] + A[7]*B[3] + A[8]*B[6]), (A[6]*B[1] + A[7]*B[4] + A[8]*B[7]), (A[6]*B[2] + A[7]*B[5] + A[8]*B[8]),  
	]
}

const MatrixMultiply3d = (A, B) => {
	if (typeof B === 'number') {
		A.forEach((n, i, ary) => ary[i] = n*B)
		return A
	}
	return [
        (A[0]*B[0] + A[1]*B[4] + A[2]*B[8] + A[3]*B[12]), (A[0]*B[1] + A[1]*B[5] + A[2]*B[9] + A[3]*B[13]), (A[0]*B[2] + A[1]*B[6] + A[2]*B[10] + A[3]*B[14]), (A[0]*B[3] + A[1]*B[7] + A[2]*B[11] + A[3]*B[15]),
        (A[4]*B[0] + A[5]*B[4] + A[6]*B[8] + A[7]*B[12]), (A[4]*B[1] + A[5]*B[5] + A[6]*B[9] + A[7]*B[13]), (A[4]*B[2] + A[5]*B[6] + A[6]*B[10] + A[7]*B[14]), (A[4]*B[3] + A[5]*B[7] + A[6]*B[11] + A[7]*B[15]),
        (A[8]*B[0] + A[9]*B[4] + A[10]*B[8] + A[11]*B[12]), (A[8]*B[1] + A[9]*B[5] + A[10]*B[9] + A[11]*B[13]), (A[8]*B[2] + A[9]*B[6] + A[10]*B[10] + A[11]*B[14]), (A[8]*B[3] + A[9]*B[7] + A[10]*B[11] + A[11]*B[15]),
        (A[12]*B[0] + A[13]*B[4] + A[14]*B[8] + A[15]*B[12]), (A[12]*B[1] + A[13]*B[5] + A[14]*B[9] + A[15]*B[13]), (A[12]*B[2] + A[13]*B[6] + A[14]*B[10] + A[15]*B[14]), (A[12]*B[3] + A[13]*B[7] + A[14]*B[11] + A[15]*B[15]),
	]	
}

const Matrix2dToString = (m) => {
	console.log('|', m[0], m[1], m[2], '|')
	console.log('|', m[3], m[4], m[5], '|')
	console.log('|', m[6], m[7], m[8], '|')
}

const Matrix3dToString = (m) => {
	console.log('|', m[0], m[1], m[2], m[3], '|')
	console.log('|', m[4], m[5], m[6], m[7], '|')
	console.log('|', m[8], m[9], m[10], m[11], '|')
	console.log('|', m[12], m[13], m[14], m[15], '|')
}

const s1 = MatrixMultiply3d(Identity3d(), [
	2, 0, 0, 0,
	0, 2, 0, 0, 
	0, 0, 2, 0,
	0, 0, 0, 1,
])
// This also scales the translations.
const t1 = MatrixMultiply3d(s1, [
	1, 0, 0, -2,
	0, 1, 0, 2, 
	0, 0, 1, 3.5,
	0, 0, 0, 1,
])

// TODO Implement addition & subtraction to represent translations.

console.log(Matrix3dToString(t1))

/*console.log(Matrix2dToString(
	MatrixMultiply2d(Identity2d(), 12)
))

console.log(Matrix3dToString(
	MatrixMultiply3d(Identity3d(), 128)
))*/

export { default as Vector2d } from './Vector2d';
export { default as Vector3d } from './Vector3d';
export {Dot2d, Dot3d, Len2d, Len3d}
