import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    email: "arekkusu.poppu@gmail.com",
    username: "arekkusupoppu",
    name: "Alex Pop",
    role: "No Role",
    fiscalYear: 0,
    personalNumber: "01",
    careerLevel: "SefPeSerpi",
    organizationalAssignment: "None",
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUsername(state, action)
        {
            state.username = action.payload.username;
        },
        setEmail(state, action)
        {
            state.email = action.payload.email;
        },
        setName(state, action)
        {
            state.name = action.payload.name;
        },
        setRole(state, action)
        {
            state.role = action.payload.role;
        },
        setFiscalYear(state, action)
        {
            state.fiscalYear = action.payload.fiscalYear;
        },
        setPersonalNumber(state, action)
        {
            state.personalNumber = action.payload.personalNumber;
        },
        setCareerLevel(state, action)
        {
            state.careerLevel = action.payload.careerLevel;
        },
        setOrganizationalAssignment(state, action)
        {
            state.organizationalAssignment = action.payload.organizationalAssignment;
        }
    }
});
export const userActions = userSlice.actions;
const userReducer = userSlice.reducer;
export default userReducer;