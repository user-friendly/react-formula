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

export {Dot2d, Dot3d, Len2d, Len3d}
