import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nodes: [],
  edges: [],
  variant: "cross",
  selectedNode: null,
  responseNodes: [],
};

const flowSlice = createSlice({
  name: "flow",
  initialState,
  reducers: {
    setNodes: (state, action) => {
      state.nodes = action.payload;
    },
    setEdges: (state, action) => {
      state.edges = action.payload;
    },
    addNode: (state, action) => {
      state.nodes.push(action.payload);
    },
    setVariant: (state, action) => {
      state.variant = action.payload;
    },
    setSelectedNode: (state, action) => {
      state.selectedNode = action.payload;
    },
    getNodesLocalStorage: (state) => {
      const storedNodes = JSON.parse(localStorage.getItem("nodes") ?? "[]");
      const storedEdges = JSON.parse(localStorage.getItem("edges") ?? "[]");
      state.nodes = storedNodes;
      state.edges = storedEdges;
    },
    addResponseNode: (state, action) => {
      state.responseNodes.push(action.payload);
    },
    clearResponseNodes: (state) => {
      state.responseNodes = [];
    },
    deleteNode: (state, action) => {
      const nodeId = action.payload;
      state.nodes = state.nodes.filter((node) => node.id !== nodeId);
      state.edges = state.edges.filter(
        (edge) => edge.source !== nodeId && edge.target !== nodeId
      );
    },
  },
});

export const {
  setNodes,
  setEdges,
  addNode,
  setVariant,
  setSelectedNode,
  getNodesLocalStorage,
  addResponseNode,
  clearResponseNodes,
  deleteNode,
} = flowSlice.actions;
export default flowSlice.reducer;
