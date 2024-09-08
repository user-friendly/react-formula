import MyComponent from './MyComponent'

const App = () => {
  return <div>
  	<MyComponent bgColor="Yellow" height={90}>
		This is some free text.
	</MyComponent>
	
	<MyComponent bgColor="Lavender" height={40}>
		<p>This is a paragraph.</p>
		<p>This is another paragraph.</p>
	</MyComponent>
	
	<MyComponent />
  </div>
}

export default App;
