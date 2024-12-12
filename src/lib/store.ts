import { configureStore } from '@reduxjs/toolkit'
import sessionReducer from './features/session/sessionSlice';
import chatSession from './features/chat/chatSlice';

export const store = configureStore({
    reducer: {
        session: sessionReducer,
        chat: chatSession
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;