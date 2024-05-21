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

import { useCallback } from "react";
import { setNodes, setEdges, addNode } from "../redux/workFlow/FlowSlice";

import TextUpdaterNode from "./TextUpdaterNode";
import { useDispatch, useSelector } from "react-redux";

const nodeTypes = { textUpdater: TextUpdaterNode };

function Flow() {
  const dispatch = useDispatch();
  const nodes = useSelector((state) => state.flow.nodes);
  const edges = useSelector((state) => state.flow.edges);
  const variant = useSelector((state) => state.flow.variant);

  // const initialNodes = [
  //   {
  //     id: "A",
  //     type: "group",
  //     position: { x: 500, y: 0 },
  //     style: {
  //       width: 170,
  //       height: 140,
  //     },
  //   },
  //   {
  //     id: "A-1",
  //     type: "input",
  //     data: { label: "input node" },
  //     position: { x: 250, y: 130 },
  //     extent: "parent",
  //     parentId: "A",
  //   },
  //   {
  //     id: "A-2",
  //     type: "output",
  //     data: { label: "output node" },
  //     position: { x: 250, y: 250 },
  //     extent: "parent",
  //     parentId: "A",
  //   },
  //   {
  //     id: "3",
  //     type: "output",
  //     data: { label: "output node 2" },
  //     position: { x: 150, y: 205 },
  //   },
  //   {
  //     id: "node-1",
  //     type: "textUpdater",
  //     position: { x: 469, y: 200 },
  //     data: { value: 123 },
  //     style: {
  //       border: "1px solid #777",
  //       padding: 10,
  //       width: 200,
  //       backgroundColor: "#f0f0f0",
  //       borderRadius: 10,
  //     },
  //   },
  // ];

  const initialEdges = [
    { id: "e1-2", source: "A-1", target: "A-2", animated: true },
  ];

  const onNodesChange = useCallback(
    (changes) => dispatch(setNodes(applyNodeChanges(changes, nodes))),
    [nodes, dispatch]
  );
  const onEdgesChange = useCallback(
    (changes) => dispatch(setEdges(applyEdgeChanges(changes, edges))),
    [edges, dispatch]
  );
  const onConnect = useCallback(
    (params) => dispatch(setEdges(addEdge(params, edges))),
    [edges, dispatch]
  );

  

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
  );
}

export default Flow;
