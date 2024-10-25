/**
 * Tailwind CSS breakpoint pseudo-selectors.
 * 
 * sm	640px	@media (min-width: 640px) { ... }
 * md	768px	@media (min-width: 768px) { ... }
 * lg	1024px	@media (min-width: 1024px) { ... }
 * xl	1280px	@media (min-width: 1280px) { ... }
 * 2xl	1536px  @media (min-width: 1536px) { ... }
 */


const Breakpoints = () => {
	return <div className="
		p-6 flex-1 flex flex-col justify-center items-center
		text-gray-700
		
		min-w-80
		
		bg-red-400
		sm:bg-amber-400
		md:bg-green-400
		lg:bg-teal-400
		xl:bg-sky-400
		2xl:bg-violet-400
		
		font-tiny5
	">
		<h2 className="text-4xl text-center">Respoinsive Design Example</h2>
		<div className="my-4 text-xl flex flex-col">
			<strong>Screen size:</strong>
			<span className="sm:hidden">Default</span>
			<span className="hidden sm:max-md:inline">Small 640px</span>
			<span className="hidden md:max-lg:inline">Medium 768px</span>
			<span className="hidden lg:max-xl:inline">Large 1024px</span>
			<span className="hidden xl:max-2xl:inline">Extra Large 1280px</span>
			<span className="hidden 2xl:inline">2 x Extra Large 1536px</span>
		</div>
	</div>
}

export default Breakpoints
