import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SessionState {
    isAuthenticated: boolean;
    username: string | null;
    token: string | null;
}

const initialState: SessionState = {
    isAuthenticated: false,
    username: null,
    token: null,
};

const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ username: string | null; token: string | null }>) => {
            localStorage.setItem('token', action.payload.token ?? '');
            localStorage.setItem('userName', action.payload.username ?? '');
            state = {
                isAuthenticated: true,
                token: action.payload.token,
                username: action.payload.username
            }
        },
        logout: (state) => {
            localStorage.removeItem('token');
            localStorage.removeItem('userName');
            state.isAuthenticated = false;
            state.username = null;
            state.token = null;
        },
        initializeSession: (state) => {
            const token = localStorage.getItem('token');
            const userName = localStorage.getItem('userName');
            state = {
                isAuthenticated: true,
                token: token,
                username: userName
            }
        }
    },
});

export const { login, logout, initializeSession } = sessionSlice.actions;

export default sessionSlice.reducer;
