import ReactFlow, {
  Controls,
  Background,
  applyEdgeChanges,
  applyNodeChanges,
  addEdge,
  Position,
  MiniMap,
} from "reactflow";
import "reactflow/dist/style.css";

import { useState, useCallback } from "react";

import TextUpdaterNode from "./TextUpdaterNode";

const nodeTypes = { textUpdater: TextUpdaterNode };

function Flow() {
  const initialNodes = [
    {
      id: 'A',
      type: 'group',
      position: { x: 0, y: 0 },
      style: {
        width: 170,
        height: 140,
      },
    },
    {
      id: "A-1",
      type: "input",
      data: { label: "input node" },
      position: { x: 250, y: 25 },
      extent: 'parent',
      parentId: 'A',
    },
    {
      id: "A-2",
      type: "output",
      data: { label: "output node" },
      position: { x: 250, y: 250 },
      extent: 'parent',
      parentId: 'A',
    },
    {
      id: "3",
      type: "output",
      data: { label: "input node 2" },
      position: { x: 100, y: 100 },
    },
    {
      id: "node-1",
      type: "textUpdater",
      position: { x: 0, y: 0 },
      data: { value: 123 },
      style: { border: "1px solid #777", padding: 10, width: 200 , backgroundColor: "#f0f0f0", borderRadius: 10}, 
    },
  ];

  const initialEdges = [];

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

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const rfStyle = {
    backgroundColor: "#005a82",
  };
  const nodeColor = (node) => {
    switch (node.type) {
      case 'input':
        return '#6ede87';
      case 'output':
        return '#6865A5';
      default:
        return '#ff0072';
    }
  };

  return (
    <div style={{ height: "100%" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        style={rfStyle}
        nodeTypes={nodeTypes}
        attributionPosition="top-right">
           <MiniMap nodeColor={nodeColor} nodeStrokeWidth={3} zoomable pannable />
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default Flow;
