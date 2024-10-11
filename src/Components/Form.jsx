import _ from 'lodash'

const Form = (props) => {
	let newProps = _.assign({}, props)
	delete newProps.preventDefault
	newProps.method = _.isString(newProps.method) ? newProps.method : 'POST'
	newProps.action = _.isString(newProps.action) ? newProps.action : '/'
	// Default is to prevent default submit behaviour.
	if (props.preventDefault === undefined || props.preventDefault == true) {
		newProps.onSubmit = (e) => {
			e.preventDefault()
			_.isFunction(props.onSubmit) && props.onSubmit(e)
		}
	}
	return <form {...newProps}>{newProps.children}</form>
}

export default Form
