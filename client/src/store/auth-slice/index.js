import { createSlice } from "@reduxjs/toolkit";


const initialState ={
    isAuthenticated: false,
    isLoading: false,
    user: null,
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    }
})

export const { setUser, setLoading } = authSlice.actions;
export default authSlice.reducer;