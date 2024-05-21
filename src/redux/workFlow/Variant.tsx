import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nodes: [],
  edges: [],
  variant: "dots",
};

const variantSlice = createSlice({
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
  },
});

export const { setNodes, setEdges, setVariant, addNode } = variantSlice.actions;
export default variantSlice.reducer;
