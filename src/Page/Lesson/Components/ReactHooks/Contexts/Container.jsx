import Wrapper from './Wrapper'

const Container = (props) => {
	return (
		<div className="p-2 m-2 text-orange-600 border-4 border-orange-400">
			<div>Container</div>
			<Wrapper message={props.message} />
		</div>
	)
}

export default Container
