import { createSlice } from "@reduxjs/toolkit";
import { login, register } from "./utils";

const initialState = {
	email: "",
	uid:"",
	username: "",
	name: "",
	role: "",
	fiscalYear: 0,
	personalNumber: "",
	careerLevel: "",
	organizationalAssignment: "",
	completedProfile: false
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser(state, action) {
			state.username = action.payload.username || "";
			state.uid = action.payload.uid || "";
			state.email = action.payload.email || "";
			state.name = action.payload.name || "";
			state.role = action.payload.role || "";
			state.fiscalYear = action.payload.fiscal_year || 0;
			state.personalNumber = action.payload.personal_number || "";
			state.careerLevel = action.payload.career_level || "";
			state.organizationalAssignment = action.payload.organisational_assignment || "";
			state.completedProfile = action.payload.completedProfile || false;
		},
		setUsername(state, action) {
			state.username = action.payload.username;
		},
		setCompletedProfile(state, action) {
			state.completedProfile = action.payload.completedProfile;
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
