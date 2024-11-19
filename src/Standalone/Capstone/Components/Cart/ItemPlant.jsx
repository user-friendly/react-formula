
// Example of a plant item:
// 
// [{
// 		plant: {
// 			uuid: '550e8400-e29b-41d4-a716-446655440000',
// 			quantity: 1,
// 			pot_color: 'amber',
//			
//			name: "Bulby Shmukuz",
//			price: 13.37,
//			image: {src: "/images/bulbysmukuz-amber-600.jpeg"},
// 		}
// }]

const ItemPlant = ({item}) => {
	const {
		uuid, quantity, pot_color,
		name, price, image
	} = item.plant
	const totalPrice = Number(price * quantity).toFixed(2)
	
	return <div className="mb-10 pb-10 border-b-2 flex text-neutral-500 font-bold">
		<div>
			<img className="w-48 rounded-lg" alt={name} src={image.src} />
		</div>
		<div className="pl-8 flex-1 flex flex-col">
			<div className="flex justify-between">
				<span className="font-playfair text-3xl text-emerald-700 font-normal">{name}</span>
				<span>${totalPrice}</span>
			</div>
			<div className="my-2">
				<span className="w-16 inline-block text-neutral-400 font-normal">qty: </span>{quantity}
			</div>
			<div className="">
				<span className="w-16 inline-block text-neutral-400 font-normal">color: </span>{pot_color}
			</div>
		</div>
	</div>
}

export default ItemPlant
