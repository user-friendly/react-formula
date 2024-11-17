
// Pass the object of the 'plant' key,
// from the cart item.
const CartPlantItem = ({item}) => {
	const cardStyle = `my-4 py-8 w-[280px] object-cover rounded-md
		flex flex-col
	`
	
	return <div className={cardStyle}>
		<span>uuid: {item.uuid}</span>
		<span>quantity: {item.quantity}</span>
		<span>pot color: {item.pot_color}</span>
	</div>
}

export default CartPlantItem
