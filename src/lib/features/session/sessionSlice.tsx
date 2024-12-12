import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SessionState {
    isAuthenticated: boolean;
    user: { username: string; email: string } | null;
    token: string | null;
}

const initialState: SessionState = {
    isAuthenticated: false,
    user: null,
    token: null,
};

const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ user: { username: string; email: string }; token: string }>) => {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
        },
    },
});

export const { login, logout } = sessionSlice.actions;

export default sessionSlice.reducer;
