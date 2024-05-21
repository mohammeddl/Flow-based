import Flow from "../nodes/Flow";
import { useDispatch, useSelector } from "react-redux";
import { setVariant, addNode } from "../redux/workFlow/FlowSlice";

export default function SideBar() {
  const dispatch = useDispatch();
  const nodes = useSelector((state) => state.flow.nodes);

  const addNewText = () => {
    const newNode = {
      id: `node-${nodes.length + 1}`,
      type: "textUpdater",
      position: { x: Math.random() * 600, y: Math.random() * 400 },
      data: { value: Math.floor(Math.random() * 100) },
      style: {
        border: "1px solid #777",
        padding: 10,
        width: 200,
        backgroundColor: "#f0f0f0",
        borderRadius: 10,
      },
    };
    localStorage.setItem("nodes", JSON.stringify(newNode));
    dispatch(addNode(newNode));
  };

  const addNewInput = () => {
    const newNode = {
      id: `node-${nodes.length + 1}`,
      type: "input",
      position: { x: Math.random() * 600, y: Math.random() * 400 },
      data: { label: "input node" },
    };
    localStorage.setItem("nodes", JSON.stringify(newNode));
    dispatch(addNode(newNode));
  };

  return (
    <div className='h-screen flex'>
      <div className='flex flex-col bg-blue-500 p-4 text-white'>
        <h2 className='text-2xl font-bold mb-4'>Variant:</h2>
        <div className='space-x-2'>
          <button
            className='bg-white text-black px-4 py-2 rounded-md'
            onClick={() => dispatch(setVariant("dots"))}>
            Dots
          </button>
          <button
            className='bg-white text-black px-4 py-2 rounded-md'
            onClick={() => dispatch(setVariant("lines"))}>
            Lines
          </button>
          <button
            className='bg-white text-black px-4 py-2 rounded-md'
            onClick={() => dispatch(setVariant("cross"))}>
            Cross
          </button>
        </div>
        <div className='max-h-fit border-solid border-2 my-2 border-gray-600 flex flex-col'>
          <button
            className='bg-white text-black px-4 py-2 m-4 rounded-md'
            onClick={addNewText}>
            Add Text
          </button>
          <button
            className='bg-white text-black px-4 py-2 m-4 rounded-md'
            onClick={addNewInput}>
            Add Input
          </button>
        </div>
      </div>
      <div className='flex-grow'>
        <Flow />
      </div>
    </div>
  );
}
