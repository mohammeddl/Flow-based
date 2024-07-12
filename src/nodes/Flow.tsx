import ReactFlow, {
  Controls,
  Background,
  applyEdgeChanges,
  applyNodeChanges,
  addEdge,
  MiniMap,
  Node,
  Edge,
  OnConnect,
  OnNodesChange
} from "reactflow";
import "reactflow/dist/style.css";

import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setNodes,
  setEdges,
  setSelectedNode,
  addResponseNode,
  clearResponseNodes,
  addSuccessNode
} from "../redux/workFlow/FlowSlice";

import TextUpdaterNode from "./TextUpdaterNode";
import SelectorNode from "./SelectorNode";
import httpsNode from "./httpsNode";
import SuccessNode from "./SuccessNode";
import ErrorNode from "./ErrorNode";
import axios from "axios";

const nodeTypes = {
  textUpdater: TextUpdaterNode,
  selectorNode: SelectorNode,
  httpsNode: httpsNode,
  SuccessNode:SuccessNode,
  ErrorNode:ErrorNode
};

function Flow() {
  const dispatch = useDispatch();
  const nodes:Node[] = useSelector((state) => state.flow.nodes);
  const edges:Edge[] = useSelector((state) => state.flow.edges);
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

  const onNodesChange:OnNodesChange = useCallback(
    (changes) => {
      const updatedNodes = applyNodeChanges(changes, nodes);
      dispatch(setNodes(updatedNodes));
      localStorage.setItem("nodes", JSON.stringify(updatedNodes));
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
    (changes) => {
      const updatedEdges = applyEdgeChanges(changes, edges);
      dispatch(setEdges(updatedEdges));
      localStorage.setItem("edges", JSON.stringify(updatedEdges));
    },
    [edges, dispatch]
  );

  function getSourceByTarget(targetId: string, nodes: Node[]) {
    const edge = edges.find((edge) => edge.target === targetId);
    return nodes.find((node) => node.id === edge.source);
  }

  const onConnect:OnConnect = useCallback(
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
      if (node.type === "httpsNode") {
        dispatch(setSelectedNode(node));
      } else if (node.type === "selectorNode") {
        dispatch(clearResponseNodes());
        dispatch(addResponseNode({ data: node.response, id: node.id }));
      } else if (node.data.label === "Run") {
        const httpsNode = getSourceByTarget(node.id, nodes);
        dispatch(clearResponseNodes());
        try {
          const response = await axios(httpsNode.data.https, {
            method: httpsNode.data.method,
          });
          let responseNode = getSourceByTarget(httpsNode.id, nodes);
          responseNode = { ...responseNode, response: { ...response.data } };
          const updatedNodes = nodes.map((node) =>
            node.id === responseNode.id ? responseNode : node
          );
          dispatch(setNodes(updatedNodes));
        } catch (error) {
          console.error(error);
        }
      }else if (node.type === "SuccessNode") {
        dispatch(clearResponseNodes());
        dispatch(addSuccessNode({ data: node.data.label, id: node.id }));
      }
    },
    [dispatch, nodes]
  );

  const rfStyle = {
    backgroundColor: "#f0f0f0",
  };

  const nodeColor = (node) => {
    switch (node.type) {
      case "httpsNode":
        return "#6ede87";
      case "output":
        return "#6865A5";
      case "ErrorNode":
        return "#ff7e7e";
        case "SuccesNode":
        return "#8ee7ff";
      default:
        return "#ff0072";
    }
  };

  const edgeOptions = {
    animated: true,
    style: {
      stroke: "black",
    },
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
      defaultEdgeOptions={edgeOptions}
      attributionPosition='top-right'
      fitView>
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
  );
}

export default Flow;
