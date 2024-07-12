import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteNode } from '../redux/workFlow/FlowSlice';
import { Trash2 } from 'lucide-react';
import { Handle } from 'reactflow';

interface ErrorNodeProps {
  id: string;
  data: {
    label: string;
  };
}

const ErrorNode: React.FC<ErrorNodeProps> = ({ id, data }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    const storedNodes = JSON.parse(localStorage.getItem("nodes")) || [];
    const updatedNodes = storedNodes.filter((node) => node.id !== id);
    localStorage.setItem("nodes", JSON.stringify(updatedNodes));

    const storedEdges = JSON.parse(localStorage.getItem("edges")) || [];
    const updatedEdges = storedEdges.filter(
      (edge) => edge.source !== id && edge.target !== id
    );
    localStorage.setItem("edges", JSON.stringify(updatedEdges));
    dispatch(deleteNode(id));
  };

  return (
    <div className="relative p-1 border border-red-400 rounded-lg bg-red-100 flex flex-col items-center">
      <Handle
        type="source"
        position="bottom"
        id="a"
        className="w-2 h-2 bg-red-600 border-none rounded-full"
      />
     
      <p className=" px-2 text-md font-semibold text-red-800">{data.label}</p>
      <button
        className="mb-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
        onClick={handleDelete}
      >
        <Trash2 className="w-2 h-2" />
      </button>
    </div>
  );
};

export default ErrorNode;
