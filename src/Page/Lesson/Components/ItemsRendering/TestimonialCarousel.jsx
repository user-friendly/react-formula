
// import _ from 'lodash'
import { useState } from 'react'

// TODO Overuse of flex?

const ListItem = ({children, data}) => {
	return <div className="w-[22rem] m-2 flex flex-col">
		<div className="py-8 flex flex-col justify-center items-center
		rounded-t-xl bg-gradient-to-r from-orange-300 to-red-400">
			<img className="block w-24" src={data.portrait} />
			<span className="text-2xl text-white">{data.name}</span>
		</div>
		
		<div className=" flex-1
			p-6 text-lg bg-white
			rounded-b-xl border border-t-0 border-neutral-300
			flex flex-col items-center
		">
			<span className="text-2xl mb-4">{data.rating} ⭐</span>
			<p className="leading-relaxed">{data.text}</p>
		</div>
	</div>
}

export default ({children, displaySize = 3}) => {
	const [offset, setOffset] = useState(0)
	
	return <div className="flex flex-col items-center text-neutral-600">
		<div className="text-5xl border-b-4 border-orange-400 pb-3 mb-10">Customers Love Al's Autos</div>
		
		{/* Lift this into a seperate component. */}
		<div className="flex items-center">
			<button className="text-4xl" onClick={e => offset > 0 ? setOffset(offset-1) : null}>⬅</button>
			
			<div className="flex flex-wrap justify-center items-strech">
				{data.slice(offset, offset+displaySize).map((d, i) => <ListItem data={d} key={i} />)}
			</div>
	
			<button className="text-4xl" onClick={e => offset < data.length-displaySize ? setOffset(offset+1) : null}>➡</button>
		</div>
	</div>
}

const data = [
  {
    name: "Victor",
    portrait: "https://static-task-assets.react-formula.com/999323.png",
    rating: 5,
    text: "I had an amazing experience at Al's Autos. The staff was incredibly friendly and knowledgeable, helping me find the perfect car within my budget. The entire process was smooth, and I felt like they genuinely cared about my needs. I highly recommend Al's Autos to anyone in the market for a new vehicle.",
  },
  {
    name: "Anne",
    portrait: "https://static-task-assets.react-formula.com/048246.png",
    rating: 4,
    text: "My recent visit to Al's Autos exceeded my expectations. The showroom had an impressive selection of cars, and the sales team was attentive without being pushy. They took the time to understand my preferences and guided me to the ideal car for my lifestyle. Overall, a great dealership experience.",
  },
  {
    name: "Ingmar",
    portrait: "https://static-task-assets.react-formula.com/496181.png",
    rating: 5,
    text: "I can't thank Al's Autos enough for their exceptional service. From the moment I walked in, I felt like a valued customer. The sales team was patient, answering all my questions, and they even helped me secure financing with favorable terms. Al truly made buying a car a stress-free process.",
  },
  {
    name: "Amin",
    portrait: "https://static-task-assets.react-formula.com/180134.png",
    rating: 4,
    text: "Kudos to Al's Autos for their professionalism and transparency. The team was upfront about pricing and worked with me to get a deal that fit my budget. The entire purchasing process was efficient, and I left the dealership with confidence in my decision. Al's Autos is definitely a dealership I trust.",
  },
  {
    name: "Jase",
    portrait: "https://static-task-assets.react-formula.com/857153.png",
    rating: 5,
    text: "I had an outstanding experience at Al's Autos. The staff was knowledgeable, and they went above and beyond to ensure I was happy with my purchase. The after-sales service was also impressive, showing their commitment to customer satisfaction. They are now my go-to dealership for quality cars.",
  },
  {
    name: "Simcha",
    portrait: "https://static-task-assets.react-formula.com/851372.png",
    rating: 5,
    text: "Highly recommend Al's Autos! The team there made the car-buying process enjoyable. They were attentive, listened to my preferences, and found the perfect match. They not only offers great cars but also delivers exceptional customer service. A top-notch dealership all around.",
  },
];
