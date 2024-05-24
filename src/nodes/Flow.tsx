import ReactFlow, {
  Controls,
  Background,
  applyEdgeChanges,
  applyNodeChanges,
  addEdge,
  MiniMap,
} from "reactflow";
import "reactflow/dist/style.css";

import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setNodes,
  setEdges,
  setSelectedNode,
  addResponseNode,
  clearResponseNodes,
} from "../redux/workFlow/FlowSlice";

import TextUpdaterNode from "./TextUpdaterNode";
// import SelectorNode from "./SelectorNode"; 

import axios from "axios";

const nodeTypes = { textUpdater: TextUpdaterNode};

function Flow() {
  const dispatch = useDispatch();
  const nodes = useSelector((state) => state.flow.nodes);
  const edges = useSelector((state) => state.flow.edges);
  const variant = useSelector((state) => state.flow.variant);

  const updateNodePositionInLocalStorage = (node) => {
    const storedNodes = JSON.parse(localStorage.getItem("nodes")) || [];
    const updatedNodes = storedNodes.map((storedNode) =>
      storedNode.id === node.id
        ? { ...storedNode, position: node.position }
        : storedNode
    );
    localStorage.setItem("nodes", JSON.stringify(updatedNodes));
  };

  const onNodesChange = useCallback(
    (changes) => {
      const updatedNodes = applyNodeChanges(changes, nodes);
      dispatch(setNodes(updatedNodes));
      changes.forEach((change) => {
        if (change.type === "position" && change.position) {
          const movedNode = updatedNodes.find((node) => node.id === change.id);
          updateNodePositionInLocalStorage(movedNode);
        }
      });
    },
    [nodes, dispatch]
  );

  const onEdgesChange = useCallback(
    (changes) => dispatch(setEdges(applyEdgeChanges(changes, edges))),
    [edges, dispatch]
  );

  const onConnect = useCallback(
    (params) => {
      const updatedEdges = addEdge(params, edges);
      dispatch(setEdges(updatedEdges));
      localStorage.setItem("edges", JSON.stringify(updatedEdges));

      const sourceNode = nodes.find((node) => node.id === params.source);
      const targetNode = nodes.find((node) => node.id === params.target);

      if (sourceNode.type === "input" && targetNode.type === "output") {
        const responseData = {
          data: `Connected ${sourceNode.data.label} to ${targetNode.data.label}`,
        };
      }
    },
    [edges, nodes, dispatch]
  );

  const onNodeClick = useCallback(
    async (event, node) => {
      if (node.type === "input") {
        dispatch(setSelectedNode(node));
      }
      if (node.data.label === "Run") {
        const inputNodes = nodes.filter(
          (n) => n.type === "input" && n.data.label !== "Run"
        );
        dispatch(clearResponseNodes());
        for (const inputNode of inputNodes) {
          try {
            const response = await axios(inputNode.data.https, {
              method: inputNode.data.method,
            });
            console.log(response);
            dispatch(addResponseNode({ data: response.data, id: inputNode.id }));
          } catch (error) {
            console.error(error);
            dispatch(
              addResponseNode({ data: { error: error.message }, id: inputNode.id })
            );
          }
        }
      }
    },
    [dispatch, nodes]
  );

  const rfStyle = {
    backgroundColor: "#f0f0f0",
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
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onNodeClick={onNodeClick}
      style={rfStyle}
      nodeTypes={nodeTypes}
      attributionPosition="top-right"
      fitView
    >
      <MiniMap
        className="bg-blue-200"
        nodeColor={nodeColor}
        nodeStrokeWidth={3}
        zoomable
        pannable
      />
      <Background color="#ccc" variant={variant} />
      <Controls />
    </ReactFlow>
  );
}

export default Flow;
