import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteNode } from '../redux/workFlow/FlowSlice';
import { Trash2 } from 'lucide-react';
import { Handle } from 'reactflow';

interface SuccessNodeProps {
  id: string;
  data: {
    label: string;
  };
}

const SuccessNode: React.FC<SuccessNodeProps> = ({ id, data }) => {
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
    <div className="relative p-4 border-2 border-green-600 rounded-lg bg-green-50 flex flex-col items-center shadow-lg">
      <Handle
        type="source"
        position="bottom"
        id="a"
        className="w-3 h-3 bg-green-600 border-none rounded-full"
      />
      <p className="text-md font-semibold text-green-800">{data.label}</p>
      <button
        className="mt-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
        onClick={handleDelete}
      >
        <Trash2 className="w-2 h-2" />
      </button>
     
    </div>
  );
};

export default SuccessNode;
