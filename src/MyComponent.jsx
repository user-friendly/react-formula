/**
 * Sample usage:
 * 
 *
	<MyComponent bgColor="Yellow" height={90}>
		This is some free text.
	</MyComponent>
	
	<MyComponent bgColor="Lavender" height={40}>
		<p>This is a paragraph.</p>
		<p>This is another paragraph.</p>
	</MyComponent>
	
	<MyComponent />
 * 
 */

const MyComponent = ({children, bgColor, height}) => {
	return (
		<div
			style={{
				minHeight: height + 'px',
				backgroundColor: bgColor,
			}}
		>
			<span>
				This is a{' '}
				{children ? (
					<em>component with children</em>
				) : (
					<strong>childless component</strong>
				)}
				.
			</span>
			<div>{children}</div>
		</div>
	)
}

export default MyComponent
