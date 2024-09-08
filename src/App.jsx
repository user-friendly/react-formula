const Box = (props) => {
	const { label, bgColor, textColor, large } = props 
	
	return <div style={{
		background: bgColor,
		color: textColor,
		fontSize: large ? '40px' : '12px'
	}}>
		{label}
	</div>
}

const App = () => {
  return <div>
  	<Box
		label="My name is Boxy"
		bgColor="CornFlowerBlue"
		textColor="White"
		large={true}
	/>
	
	<Box
		label="This is a cardboard box"
		bgColor="Lavender"
		textColor="Magenta"
		large={false}
	/>

	<Box
		label="Wooden Chest"
		bgColor="Green"
		textColor="White"
	/>
  </div>
}

export default App;
