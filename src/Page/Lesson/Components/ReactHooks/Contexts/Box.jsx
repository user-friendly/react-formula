import Title from './Title'

const Box = (props) => {
	return (
		<div className="p-2 m-2 text-green-600 border-4 border-green-400">
			<div>Box</div>
			<Title message={props.message} />
		</div>
	)
}

export default Box
