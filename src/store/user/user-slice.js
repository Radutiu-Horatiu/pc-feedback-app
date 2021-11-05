import { createSlice } from "@reduxjs/toolkit";
import { login, logout, register } from "./utils";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../../firebase";

const initialState = {
	username: "",
	email: "",
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
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
		signOut(state) {
			state.email = logout();
		},
	},
});
export const userActions = userSlice.actions;
const userReducer = userSlice.reducer;
export default userReducer;
