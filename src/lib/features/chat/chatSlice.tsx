import { chats } from '@/src/helpers/constants/chats';
import { Chat } from '@/src/helpers/model/Chat';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ChatState {
    selectedChatIdx: number;
    chats: Chat[];
}

const initialState: ChatState = {
    selectedChatIdx: 0,
    chats: chats
};

const sessionSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        updateSelectedChatIdx: (state, action: PayloadAction<{ newIndex: number }>) => {
            state.selectedChatIdx = action.payload.newIndex;
        }
    },
});

export const { updateSelectedChatIdx } = sessionSlice.actions;

export default sessionSlice.reducer;
