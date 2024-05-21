import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nodes: [],
  edges: [],
  variant: "dots",
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
    setVariant: (state, action) => {
      state.variant = action.payload;
    },
    addNode: (state, action) => {
      state.nodes.push(action.payload);
    },
    getNodesLocalStorage: (state) => {
      const storedNodes = JSON.parse(localStorage.getItem("nodes") ?? "") || [];
      state.nodes = storedNodes;
    },
  },
});

export const { setNodes, setEdges, setVariant, addNode, getNodesLocalStorage } =
  flowSlice.actions;
export default flowSlice.reducer;
