/**
 * Linear algebra operations.
 */

const Dot2d = (a, b) => {
	if (a.length !== b.lenght) {
		throw "array lenghts are not compatible"
	}
	
	return a.x*b.x + a.y*b.y
} 

const Dot3d = (a, b) => {
	if (a.length !== b.lenght) {
		throw "array lenghts are not compatible"
	}
	
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

/**
 * Multiply a matrix with a scalar, vector or another matrix (of the same size).
 * A - a square matrix, 3x3
 * B - can be one of: scalar value, a 2d verts ([x, y, w]), square (3x3) matrix
 */
const MatrixMultiply2d = (A, B) => {
	if (typeof B === 'number') {
		A.forEach((n, i, ary) => ary[i] = n*B)
		return A
	} else if (B.length === 3) {
		return [
			(A[0]*B[0] + A[1]*B[1] + A[2]*B[2]),
			(A[3]*B[0] + A[4]*B[1] + A[5]*B[2]),
			(A[6]*B[0] + A[7]*B[1] + A[8]*B[2]),
		]
	} else if (B.length / 3 == 3) {
		return [
			(A[0]*B[0] + A[1]*B[3] + A[2]*B[6]), (A[0]*B[1] + A[1]*B[4] + A[2]*B[7]), (A[0]*B[2] + A[1]*B[5] + A[2]*B[8]),
			(A[3]*B[0] + A[4]*B[3] + A[5]*B[6]), (A[3]*B[1] + A[4]*B[4] + A[5]*B[7]), (A[3]*B[2] + A[4]*B[5] + A[5]*B[8]),
			(A[6]*B[0] + A[7]*B[3] + A[8]*B[6]), (A[6]*B[1] + A[7]*B[4] + A[8]*B[7]), (A[6]*B[2] + A[7]*B[5] + A[8]*B[8]),  
		]
	}
	throw "Invalid array length."
}

/**
 * Multiply an array of 2d vertices by a matrix, in place.
 */
const MatrixMultiply2dVerts = (A, verts) => {
	if (verts.length % 3 == 0) {
		let [vx, vy, vw, index] = [0, 0, 0, 0]
		const vCount = verts.length / 3
		for (let offset = 0; offset < vCount; offset++) {
			index = 3*offset; // Semicolon needed here? Why?
			[vx, vy, vw] = [verts[0 + index], verts[1 + index], verts[2 + index]]
			// Calc dot x
			verts[0 + index] = A[0]*vx + A[1]*vy + A[2]*vw
			// Calc dot y
			verts[1 + index] = A[3]*vx + A[4]*vy + A[5]*vw
			// Calc dot w
			verts[2 + index] = A[6]*vx + A[7]*vy + A[8]*vw
		}
	} else {
		throw "Invalid array length."
	}
}

const MatrixMultiply3d = (A, B) => {
	throw "TODO Implement same ops as 2d."
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

/**
 * Debug matrix.
 * 
 * mat is an array of numbers.
 * n is columns.
 * Rows are automatically deduced.
 */
const MatrixToString = (mat, n = 3) => {
	let maxPad = 0
	const str = mat.map((num) => {
		num = num.toFixed(2)
		if (num.length > maxPad) {
			maxPad = num.length
		}
		return num
	})
	let line = []; const lines = []
	while ((line = str.splice(0, n).map((num) => num.padStart(maxPad, ' '))).length) {
		lines.push(`| ${line.join(' ')} |`)
	}
	return lines.join("\n")
}

const Matrix2dToString = (mat) => {
	return MatrixToString(mat, 3)
}
const Matrix3dToString = (mat) => {
	return MatrixToString(mat, 4)
}

export {Matrix2dToString, Matrix3dToString}

export {Dot2d, Dot3d, Len2d, Len3d, MatrixMultiply2d, MatrixMultiply2dVerts, MatrixMultiply3d, Identity2d, Identity3d}
