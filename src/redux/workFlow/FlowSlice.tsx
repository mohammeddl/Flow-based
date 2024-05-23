import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nodes: [],
  edges: [],
  variant: "cross",
  selectedNode: null,
  responseNode: null,
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
    getResponseNode: (state, action) => {
      state.responseNode = action.payload;
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
  getResponseNode,
} = flowSlice.actions;
export default flowSlice.reducer;
