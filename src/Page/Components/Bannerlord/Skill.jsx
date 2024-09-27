

export default ({children, label="Undefined"}, checked=false) => {
	return <label className="cursor-pointer">
		<input className="cursor-pointer" name="wood_chopper" type="checkbox" defaultChecked={checked} /> {label}
	</label>
}
