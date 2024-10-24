import { useState } from "react";

const Example3 = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="h-screen bg-emerald-100">
      <h2 className="p-8 text-3xl font-bold text-green-700">Example 3</h2>
      <button
        onClick={() => {
          if (isPlaying) {
            setIsPlaying(false);
          } else {
            setIsPlaying(true);
          }
        }}
        className="px-8 py-2 mx-8 my-2 text-white rounded-full bg-emerald-600"
      >
        {isPlaying ? "Pause" : "Play"}
      </button>
      <video width="480">
        <source src="https://static-task-assets.react-formula.com/kickflip.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default Example3;
