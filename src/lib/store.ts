import { combineReducers, configureStore } from '@reduxjs/toolkit'
import sessionReducer from './features/session/sessionSlice';
import chatReducer from './features/chat/chatSlice';

const rootReducer = combineReducers({
    session: sessionReducer,
    chat: chatReducer
});

export const makeStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']