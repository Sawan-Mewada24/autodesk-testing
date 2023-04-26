import { createSlice } from "@reduxjs/toolkit";

const initialValues = {
  data: true,
};
export const valueSlice = createSlice({
  name: "form",
  initialState: initialValues,
  reducers: {
    login: (state, actions) => {
      state.data = actions.payload;
    },
  },
});
export const { login } = valueSlice.actions;
export default valueSlice.reducer;
