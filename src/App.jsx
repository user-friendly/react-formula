const Message = (props) => {
	const {text, bgColor} = props	
	return <div style={{
		background: bgColor
	}}>
		{text}
	</div>
}

const App = () => {
  return <div style={{border: "1pt solid black"}}>
  	<Message text="Sky" bgColor="cyan" />
	<Message text="Grass" bgColor="green" />
	<Message text="Strawberry" bgColor="red" />
  </div>
}

export default App;
