import ReactFlow, {
  Controls,
  Background,
  applyEdgeChanges,
  applyNodeChanges,
} from "reactflow";
import "reactflow/dist/style.css";

import { useState, useCallback } from "react";

function Flow() {
  const initialNodes = [
    {
      id: "1",
      type: "input",
      data: { label: "input node" },
      position: { x: 250, y: 25 },
    },
    {
      id: "2",
      type: "output",
      data: { label: "output node" },
      position: { x: 250, y: 250 },
    },
    {
      id: "3",
      type: "output",
      data: { label: "input node 2" },
      position: { x: 100, y: 100 },
    },
  ];

  const initialEdges = [{ id: "1-2-3", source: "1", target: "3" }];

  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  return (
    <div style={{ height: "100%" }}>
      <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange}  onEdgesChange={onEdgesChange} >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default Flow;
