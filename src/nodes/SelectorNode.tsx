import { useDispatch } from "react-redux";
import { deleteNode } from "../redux/workFlow/FlowSlice";
import { Trash2 } from "lucide-react";
import { Handle } from "reactflow";


interface SelectorNodeProps {
  id: string;
  data: {
    label: string;
  };
}
const SelectorNode: React.FC<SelectorNodeProps> = ({ id, data }) => {
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
    <div className="relative p-2 border border-gray-400 rounded-lg bg-gray-100 flex flex-col items-center">
      <Handle
        type="target"
        position="top"
        id="a"
        className="w-2 h-2 bg-gray-800 border-none rounded-full"
      />
      <p className="text-sm">{data.label}</p>
      <button
        className="mt-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
        onClick={handleDelete}
      >
        <Trash2 className="w-2 h-2" />
      </button>
      <Handle
        type="source"
        position="bottom"
        id="b"
        className="w-2 h-2 bg-gray-800 border-none rounded-full"
      />
      <Handle
        type="target"
        position="left"
        id="c"
        className="w-1 h-1 bg-green-800 border-none rounded-full"
      />
      <Handle
        type="target"
        position="right"
        id="d"
        className="w-1 h-1 bg-red-800 border-none rounded-full"
      />
      
    </div>
  );
};

export default SelectorNode;
