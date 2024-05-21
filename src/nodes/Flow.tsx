// components/Flow.js
import ReactFlow, {
  Controls,
  Background,
  applyEdgeChanges,
  applyNodeChanges,
  addEdge,
  MiniMap,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNodes, setEdges, setSelectedNode } from '../redux/workFlow/FlowSlice';

import TextUpdaterNode from './TextUpdaterNode';

const nodeTypes = { textUpdater: TextUpdaterNode };

function Flow() {
  const dispatch = useDispatch();
  const nodes = useSelector((state) => state.flow.nodes);
  const edges = useSelector((state) => state.flow.edges);
  const variant = useSelector((state) => state.flow.variant);

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

  const onNodeClick = useCallback(
    (event, node) => {
      dispatch(setSelectedNode(node));
    },
    [dispatch]
  );

  const rfStyle = {
    backgroundColor: '#f0f0f0',
  };

  const nodeColor = (node) => {
    switch (node.type) {
      case 'input':
        return '#6ede87';
      case 'output':
        return '#6865A5';
      case 'textUpdater':
        return '#ff7e7e';
      default:
        return '#ff0072';
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
    >
      <MiniMap className="bg-blue-200" nodeColor={nodeColor} nodeStrokeWidth={3} zoomable pannable />
      <Background color="#ccc" variant={variant} />
      <Controls />
    </ReactFlow>
  );
}

export default Flow;
