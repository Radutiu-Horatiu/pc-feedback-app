import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    username: "",
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUsername(state, action)
        {
            state.username = action.payload.username;
        }
    }
});
export const userActions = userSlice.actions;
const userReducer = userSlice.reducer;
export default userReducer;