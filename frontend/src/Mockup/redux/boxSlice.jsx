import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  size: { width: 1, height: 1, depth: 1 },
  images: [],
  colors: {
    front: "#ffffff",
    back: "#ffffff",
    top: "#ffffff",
    bottom: "#ffffff",
    left: "#ffffff",
    right: "#ffffff",
  },
  text: [],
  history: [],
  future: [],
};

const boxSlice = createSlice({
  name: "box",
  initialState,
  reducers: {
    setSize: (state, action) => {
      state.history.push({ ...state });
      state.size = action.payload;
      state.future = [];
    },
    addImage: (state, action) => {
      state.history.push({ ...state });
      state.images.push(action.payload);
      state.future = [];
    },
    setColor: (state, action) => {
      state.history.push({ ...state });
      state.colors[action.payload.face] = action.payload.color;
      state.future = [];
    },
    addText: (state, action) => {
      state.history.push({ ...state });
      state.text.push(action.payload);
      state.future = [];
    },
    undo: (state) => {
      if (state.history.length > 0) {
        const prevState = state.history.pop();
        state.future.push({ ...state });
        Object.assign(state, prevState);
      }
    },
    redo: (state) => {
      if (state.future.length > 0) {
        const nextState = state.future.pop();
        state.history.push({ ...state });
        Object.assign(state, nextState);
      }
    },
    resetBox: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { setSize, addImage, setColor, addText, undo, redo, resetBox } = boxSlice.actions;
export default boxSlice.reducer;
