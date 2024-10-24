const Example1 = () => {
  return (
    <div className="relative h-screen bg-violet-100">
      <h2 className="p-8 text-3xl font-bold text-violet-700">Example 1</h2>
      <div className="flex justify-center">
        <button
          className="px-8 py-2 mx-8 text-white bg-purple-500 rounded-full"
        >
          scroll to dog
        </button>
      </div>
      <div className="absolute bottom-8 left-8">
        <i className="text-5xl fa-solid fa-dog"></i>
      </div>
    </div>
  );
};

export default Example1;
