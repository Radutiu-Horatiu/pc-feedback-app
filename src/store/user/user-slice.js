import { createSlice } from "@reduxjs/toolkit";
import { login, register } from "./utils";

const initialState = {
	email: "",
	username: "",
	name: "",
	role: "",
	fiscalYear: 0,
	personalNumber: "",
	careerLevel: "",
	organizationalAssignment: "",
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser(state, action) {
			state.username = action.payload.username || "";
			state.email = action.payload.email || "";
			state.name = action.payload.name || "";
			state.role = action.payload.role || "";
			state.fiscalYear = action.payload.fiscalYear || 0;
			state.personalNumber = action.payload.personalNumber || "";
			state.careerLevel = action.payload.careerLevel || "";
			state.organizationalAssignment = action.payload.organizationalAssignment || "";
		},
		setUsername(state, action) {
			state.username = action.payload.username;
		},
		setEmail(state, action) {
			state.email = action.payload.email;
		},
		login(state, action) {
			state.email = login(action.payload.email, action.payload.pass);
		},
		register(state, action) {
			state.email = register(action.payload.email, action.payload.pass);
		},
		signOut: (state) => initialState
	},
});
export const userActions = userSlice.actions;
const userReducer = userSlice.reducer;
export default userReducer;
