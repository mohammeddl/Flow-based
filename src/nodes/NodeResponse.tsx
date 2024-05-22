import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { getResponseNode } from "../redux/workFlow/FlowSlice";

export default function NodeResponse() {
  const dispatch = useDispatch();
  const responseNode = useSelector((state) => state.flow.responseNode);

  const [isOpen, setIsOpen] = useState(true);

  const toggleForm = () => {
    setIsOpen(!isOpen);
    dispatch(getResponseNode(null));
  };

  if (!isOpen || !responseNode) {
    return null;
  }

  return (
    <>
      <div className='p-4 bg-blue-200 border rounded shadow-md '>
        <div className='flex justify-end'>
          <button onClick={toggleForm} className='text-gray-500'>
            X
          </button>
        </div>
        <h2 className='text-xl font-bold mb-4'>Node Response</h2>
        <div>
            <p>{JSON.stringify(responseNode.data)}</p>
        </div>
      </div>
    </>
  );
}
