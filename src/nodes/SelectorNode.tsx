import { useDispatch } from "react-redux";
import { deleteNode } from "../redux/workFlow/FlowSlice";

const SelectorNode = ({ id, data }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    // Remove node from local storage
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
    <div
      style={{
        padding: "10px",
        border: "1px solid #777",
        borderRadius: "10px",
        backgroundColor: "#f0f0f0",
      }}
    >
      <strong>{data.label}</strong>
      <button onClick={handleDelete} style={{ marginTop: 10 }}>
        Delete
      </button>
    </div>
  );
};

export default SelectorNode;
