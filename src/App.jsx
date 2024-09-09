import { Fragment } from 'react';

const Button = (props) => {
	const {children} = props
	// TODO Use Router instead.
	return <a href="#" className="
		select-none
		cursor-pointer
		
		px-2.5
		
		rounded-xl
		bg-sky-400
		
		transition-bg
	">
		{children}
	</a>
}

const NavBar = (props) => {
	const {children} = props
	return <div className="
		text-lg
		font-semibold
		font-mono
		
		text-stone-800
		
		p-2
		
		flex flex-row flex-wrap gap-2
		place-content-center
  	 ">
		{children}
	</div>
}

const App = () => {
  return <div className="flex flex-col pt-6">
  	<NavBar>
		<Button>Home</Button>
		<Button>Portfolio</Button>
		<Button>Resume</Button>
		<Button>About</Button>
		
		{/*
		<Button>Item 1</Button>
		<Button>Item 2</Button>
		<Button>Item 3</Button>
		<Button>Item 4</Button>
		*/}
	</NavBar>
	
	{/* TODO Centering content with margin x-axis auto at medium breakpiont, is this a good idea? */}
	<div className="
		text-sans
		
		w-auto
		md:w-1/2
		md:mx-auto
		
		p-6
		mx-6 my-8
		
		rounded-xl bg-slate-300
	">
		<p>This is just some random text. The first paragraph of many to come.</p>
		<p>Not really that many to come. Just a couple more to come.</p>
		<p>It was a warm spring morning when the sun rose over the misty mountains.</p>
	</div>
	
	<div>
		<NavBar>
			<Button>Site Map</Button>
			<Button>Contact</Button>
		</NavBar>
		
		<NavBar>
			<Button>Terms & Conditions</Button>
			<Button>Privacy Policy</Button>
		</NavBar>
	</div>
  </div>
}

export default App;
