import { useState } from "react";

const CatItem = (props) => {
  const { cat } = props;

  return (
    <div className="relative z-[1] flex flex-col items-center rounded-lg bg-white h-56 max-w-lg w-full my-8">
      <div className="ml-36 flex items-end flex-1 pb-4 rounded-t-md max-w-[260px] w-full">
        <div className="relative">
          <div className="absolute block -skew-y-3 -inset-1 bg-rose-300"></div>
          <div className="relative text-3xl font-medium text-violet-700">{cat.name}</div>
        </div>
        <div className="ml-6 text-xl text-neutral-400">age {cat.age}</div>
      </div>
      <div className="relative z-[-1] flex bg-violet-700 w-full rounded-b-md pb-4 pl-6 pr-2">
        <div className="-mt-[80px] rounded-full overflow-clip shadow-inner w-32 h-32 border-4 border-white">
          <img className="relative z-[-1]" src={cat.imageUrl} />
        </div>
        <div className="mx-10 max-w-[260px] w-full py-4">
          <div className="text-lg text-teal-100">{cat.interests}</div>
        </div>
      </div>
      <i className="absolute scale-150 rotate-45 top-9 right-7 text-transparent/10 text-8xl">🐾</i>
    </div>
  )
}

export default () => {
  const [cats, setCats] = useState(initialCats);
  
  const catItems = cats.map((cat, idx) => <CatItem key={idx} cat={cat} />);

  return <div className="flex flex-col items-center justify-center py-10 bg-indigo-50">
	  <div className="flex flex-col items-center w-full max-w-2xl">
	    {catItems}
	  </div>
	</div>
}

const initialCats = [
  {
    name: "Mittens",
    imageUrl: "https://static-task-assets.react-formula.com/698552.jpg",
    interests: "Chasing birds and sitting in enclosed spaces",
    age: 4,
  },
  {
    name: "Biscuit",
    imageUrl: "https://static-task-assets.react-formula.com/302683.jpg",
    interests: "Staring out the window, scratching furniture, and treats",
    age: 6,
  },
  {
    name: "Winnie",
    imageUrl: "https://static-task-assets.react-formula.com/413459.jpg",
    interests: "Eating catnip and drinking out of cups that aren't hers.",
    age: 11,
  },
  {
    name: "Tubbs",
    imageUrl: "https://static-task-assets.react-formula.com/893293.jpg",
    interests: "Naps in the sunlight, watching animal planet.",
    age: 3,
  },
  {
    name: "Chester",
    imageUrl: "https://static-task-assets.react-formula.com/416375.jpg",
    interests: "Sitting in high places and stretching.",
    age: 8,
  },
  {
    name: "Mr. Sparkles",
    imageUrl: "https://static-task-assets.react-formula.com/561625.jpg",
    interests: "Knocking over things and sleeping in clean laundry.",
    age: 11,
  },
];
