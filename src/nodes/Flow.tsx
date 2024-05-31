import ReactFlow, {
  Controls,
  Background,
  applyEdgeChanges,
  applyNodeChanges,
  addEdge,
  MiniMap,
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
  deleteNode,
  setDisplayedResponse,
} from "../redux/workFlow/FlowSlice";

import TextUpdaterNode from "./TextUpdaterNode";
import SelectorNode from "./SelectorNode";
import httpsNode from "./httpsNode";
import axios from "axios";

const nodeTypes = {
  textUpdater: TextUpdaterNode,
  selectorNode: SelectorNode,
  httpsNode: httpsNode,
};

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

  function spesicNode(targetId, nodes, sourceId) {
    const sourceNode = nodes.find((node) => node.id === sourceId);
    const targetNode = nodes.find((node) => node.id === targetId);

    if (sourceNode.type === "input" && targetNode.type === "output") {
      const responseData = {
        data: `Connected ${sourceNode.data.label} to ${targetNode.data.label}`,
      };
    }
  }
  

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
  // const [res, setRes] = useState([]);
  const onNodeClick = useCallback(
    async (event, node) => {
      if (node.type === "httpsNode") {
        dispatch(setSelectedNode(node));
      } else if (node.type === "selectorNode") {
        dispatch(clearResponseNodes());
        dispatch(
          addResponseNode({ data: node.data.outputPorts[0], id: node.id })
        );
      } else if (node.data.label === "Run") {
        const httpsNode = nodes.find(
          // check for the one that's connect with the run button
          (n) =>
            edges.some((e) => e.source === n.id && e.target === node.id) &&
            n.type === "httpsNode"
        );

        console.log("test run", httpsNode);
        dispatch(clearResponseNodes());
        try {
          const response = await axios(httpsNode.data.https, {
            method: httpsNode.data.method,
          });
          const responseNode = nodes.find(
            (n) =>{
              console.log(n)
              n.type === "selectorNode" &&
              edges.some((e) => e.source === n.id && e.target)
            }
          );

          // node.data.outputPorts = [{ ...response.data }];
          console.log("node ", responseNode);
          // setRes(response.data);
        } catch (error) {
          console.error(error);
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
      case "httpsNode":
        return "#6ede87";
      case "output":
        return "#6865A5";
      case "textUpdater":
        return "#ff7e7e";
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
