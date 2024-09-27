
import _ from 'lodash'

const dollarUSLocale = Intl.NumberFormat('en-US');

const PropertyItem = ({children, property}) => {
	const price = _.random(15000000, 25000000)
	
	return <div className="m-4 p-4">
		<div>
			<img src={property.imageUrl} />
		</div>
		
		<div>
			{property.address}
		</div>
		
		<div>
			{property.city}, {property.state}
		</div>
		
		<div>
			$ {dollarUSLocale.format(price)}
		</div>
		
		<div className="flex justify-between">
			<span>🛏 {property.bedrooms}</span>
			<span>🛁 {property.bathrooms}</span>
		</div>
	</div>
}

export default ({children}) => {
	return <div className="md:self-center md:w-[38rem]">
		{properties.map((p, i) => <PropertyItem property={p} key={i} />)}
	</div>
}

const properties = [
  {
    address: "123 Main St",
    city: "Springfield",
    state: "IL",
    bedrooms: 3,
    bathrooms: 2,
    imageUrl: "https://static-task-assets.react-formula.com/104799.jpg",
  },
  {
    address: "456 Oak Ave",
    city: "Rivertown",
    state: "CA",
    bedrooms: 4,
    bathrooms: 3,
    imageUrl: "https://static-task-assets.react-formula.com/428468.jpg",
  },
  {
    address: "8796 Pine Ln",
    city: "Mountainville",
    state: "NY",
    bedrooms: 2,
    bathrooms: 1,
    imageUrl: "https://static-task-assets.react-formula.com/552545.jpg",
  },
  {
    address: "101 Elm St",
    city: "Lakeview",
    state: "FL",
    bedrooms: 3,
    bathrooms: 2.5,
    imageUrl: "https://static-task-assets.react-formula.com/745180.jpg",
  },
  {
    address: "202 Maple Dr",
    city: "Hilltop",
    state: "TX",
    bedrooms: 5,
    bathrooms: 3,
    imageUrl: "https://static-task-assets.react-formula.com/752306.jpg",
  },
  {
    address: "303 Birch Ct",
    city: "Meadowville",
    state: "PA",
    bedrooms: 2,
    bathrooms: 1.5,
    imageUrl: "https://static-task-assets.react-formula.com/930710.jpg",
  },
  {
    address: "404 Cedar Rd",
    city: "Sunset City",
    state: "AZ",
    bedrooms: 4,
    bathrooms: 2.5,
    imageUrl: "https://static-task-assets.react-formula.com/987654.jpg",
  },
  {
    address: "505 Spruce Blvd",
    city: "Harbor Springs",
    state: "MI",
    bedrooms: 3,
    bathrooms: 2,
    imageUrl: "https://static-task-assets.react-formula.com/123456.jpg",
  },
  {
    address: "606 Candy Mountain",
    city: "Hillside",
    state: "NC",
    bedrooms: 2,
    bathrooms: 1,
    imageUrl: "https://static-task-assets.react-formula.com/473829.jpg",
  },
  {
    address: "707 Cherry Hill Ln",
    city: "Brookside",
    state: "GA",
    bedrooms: 4,
    bathrooms: 3,
    imageUrl: "https://static-task-assets.react-formula.com/561234.jpg",
  },
  {
    address: "809 47th St",
    city: "Maplewood",
    state: "OH",
    bedrooms: 3,
    bathrooms: 2.5,
    imageUrl: "https://static-task-assets.react-formula.com/750293.jpg",
  },
  {
    address: "909 Ducksworth Ave",
    city: "Riverdale",
    state: "UT",
    bedrooms: 5,
    bathrooms: 3.5,
    imageUrl: "https://static-task-assets.react-formula.com/876543.jpg",
  },
  {
    address: "1010 Eelhelm Dr",
    city: "Glenview",
    state: "WA",
    bedrooms: 2,
    bathrooms: 1.5,
    imageUrl: "https://static-task-assets.react-formula.com/967392.jpg",
  },
];
