import { createSlice } from "@reduxjs/toolkit";
export const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        token: null,
        isAuth: false,
        expiresIn: 0,
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuth = true;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuth = false;
        },
    },
});
export const { login, logoutt } = authSlice.actions;
export default authSlice.reducer;
