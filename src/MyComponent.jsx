const MyComponent = (props) => {
	const {children, bgColor, height} = props
	 
	return <div style={{
		minHeight: height + 'px',
		backgroundColor: bgColor
	}}>
		<span>
			This is a {children ? <em>component with children</em> : <strong>childless component</strong>}.
		</span>
		<div>
			{children}
		</div>
	</div>
}

export default MyComponent
