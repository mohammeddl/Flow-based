import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { clearResponseNodes } from "../redux/workFlow/FlowSlice";

export default function NodeResponse() {
  const dispatch = useDispatch();
  const responseNodes = useSelector((state) => state.flow.responseNodes);

  const [isOpen, setIsOpen] = useState(true);

  const toggleForm = () => {
    setIsOpen(!isOpen);
    dispatch(clearResponseNodes());
  };

  if (!isOpen || responseNodes.length === 0) {
    return null;
  }

  return (
    <div className="p-4 bg-blue-200 border rounded shadow-md max-h-full">
      <div className="flex justify-end">
        <button onClick={toggleForm} className="text-gray-500">
          X
        </button>
      </div>
      <h2 className="text-xl font-bold mb-4">Node Responses</h2>
      <div>
          <div className="mb-4 ">
            <h3 className="font-bold">Response from Node {responseNodes.id}:</h3>
            <p className="w-1/2 ">{JSON.stringify(responseNodes, null, 2)}</p>
            {responseNodes.data.message && (
              <img
                className="h-fit"
                src={responseNodes.data.message}
                alt="response"
              />
            )}
          </div>
      </div>
    </div>
  );
}
