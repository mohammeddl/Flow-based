import ReactFlow, {
  Controls,
  Background,
  applyEdgeChanges,
  applyNodeChanges,
  addEdge,
  MiniMap,
  Panel,
} from "reactflow";
import "reactflow/dist/style.css";

import { useState, useCallback } from "react";

import TextUpdaterNode from "./TextUpdaterNode";

const nodeTypes = { textUpdater: TextUpdaterNode };

function Flow() {
  const initialNodes = [
    {
      id: "A",
      type: "group",
      position: { x: 500, y: 0 },
      style: {
        width: 170,
        height: 140,
      },
    },
    {
      id: "A-1",
      type: "input",
      data: { label: "input node" },
      position: { x: 250, y: 130 },
      extent: "parent",
      parentId: "A",
    },
    {
      id: "A-2",
      type: "output",
      data: { label: "output node" },
      position: { x: 250, y: 250 },
      extent: "parent",
      parentId: "A",
    },
    {
      id: "3",
      type: "output",
      data: { label: "output node 2" },
      position: { x: 150, y: 205 },
    },
    {
      id: "node-1",
      type: "textUpdater",
      position: { x: 469, y: 200 },
      data: { value: 123 },
      style: {
        border: "1px solid #777",
        padding: 10,
        width: 200,
        backgroundColor: "#f0f0f0",
        borderRadius: 10,
      },
    },
  ];

  const initialEdges = [
    { id: "e1-2", source: "A-1", target: "A-2", animated: true },
  ];

  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [variant, setVariant] = useState("dots");

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
    setNodes((nds) => nds.concat(newNode));
  };

const addNewInput = () => {
  const newNode = {
    id: `node-${nodes.length + 1}`,
    type: "input",
    position: { x: Math.random() * 600, y: Math.random() * 400 },
    data: { label: "input node" },
  };
  localStorage.setItem("nodes", JSON.stringify(newNode));
  setNodes((nds) => nds.concat(newNode));
}

  const rfStyle = {
    backgroundColor: "#005a82",
  };

  const nodeColor = (node) => {
    switch (node.type) {
      case "input":
        return "#6ede87";
      case "output":
        return "#6865A5";
      case "textUpdater":
        return "#ff7e7e";
      default:
        return "#ff0072";
    }
  };

  return (
    <div className='h-screen flex'>
      <div className='flex flex-col  bg-blue-500 p-4 text-white'>
        <h2 className='text-2xl font-bold mb-4'>Variant:</h2>
        <div className='space-x-2'>
          <button
            className='bg-white text-black px-4 py-2 rounded-md'
            onClick={() => setVariant("dots")}>
            Dots
          </button>
          <button
            className='bg-white text-black px-4 py-2 rounded-md'
            onClick={() => setVariant("lines")}>
            Lines
          </button>
          <button
            className='bg-white text-black px-4 py-2 rounded-md'
            onClick={() => setVariant("cross")}>
            Cross
          </button>
        </div>
        <div className="max-h-fit border-solid border-2 my-2 border-gray-600 flex flex-col">
        <button
          className='bg-white text-black px-4 py-2  m-4 rounded-md'
          onClick={addNewText}>
          Add Text
        </button>
        <button
          className='bg-white text-black px-4 py-2  m-4 rounded-md'
          onClick={addNewInput}>
          Add Input
        </button>
        </div>
      </div>
      <div className='flex-grow'>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          defaultNodes={nodes}
          defaultEdges={edges}
          style={rfStyle}
          nodeTypes={nodeTypes}
          attributionPosition='top-right'>
          <MiniMap
            className='bg-blue-200'
            nodeColor={nodeColor}
            nodeStrokeWidth={3}
            zoomable
            pannable
          />
          <Background color='#ccc' variant={variant} />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}

export default Flow;
