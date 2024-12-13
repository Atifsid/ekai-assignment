import { CATEGORIES } from '@/src/helpers/constants/chats';
import { Chat } from '@/src/helpers/model/Chat';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ChatState {
    selectedChatInfo: { category: string, id: string };
    categories: {
        [categoryId: string]: Array<Chat>;
    };
}

const initialState: ChatState = {
    selectedChatInfo: {
        category: 'Work',
        id: 'work-chat-1',
    },
    categories: CATEGORIES,
};

const sessionSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        moveChatToCategory: (state: ChatState, action: PayloadAction<{ chatId: string; categoryId: string }>) => {
            const { chatId, categoryId } = action.payload;
            state.selectedChatInfo = {
                category: action.payload.categoryId,
                id: action.payload.chatId
            };
            let chatToMove;
            for (let category in state.categories) {
                const chatIndex = state.categories[category].findIndex(chat => chat.id === chatId);
                if (chatIndex !== -1) {
                    chatToMove = state.categories[category].splice(chatIndex, 1)[0];
                    break;
                }
            }
            if (chatToMove) {
                state.categories[categoryId].push(chatToMove);
            }
        },
        addCategory: (state: ChatState, action: PayloadAction<{ newCategoryId: string }>) => {
            state.categories[action.payload.newCategoryId] = [];
            state.categories = {
                [action.payload.newCategoryId]: [],
                ...state.categories
            }
        },
        removeCategory: (state: ChatState, action: PayloadAction<{ categoryIdToRemove: string }>) => {
            if (state.categories[action.payload.categoryIdToRemove]) {
                delete state.categories[action.payload.categoryIdToRemove];
            }
        },
        removeChat: (state: ChatState, action: PayloadAction<{ categoryId: string; chatIdToRemove: string }>) => {
            const chatIdxToRemove = state.categories[action.payload.categoryId]?.findIndex(chat => chat.id === action.payload.chatIdToRemove);

            if (chatIdxToRemove > -1) {
                state.categories[action.payload.categoryId].splice(chatIdxToRemove, 1);
            }
        },
        sendMessage: (state: ChatState, action: PayloadAction<{ question: string }>) => {
            const chatIdx = state.categories[state.selectedChatInfo.category].findIndex(chat => chat.id === state.selectedChatInfo.id);
            state.categories[state.selectedChatInfo.category][chatIdx].messages.push({ question: action.payload.question, answer: `Answer mock up for: ${action.payload.question}` });
        },
        addChat: (state: ChatState, action: PayloadAction<{ categoryId: string }>) => {
            state.categories[action.payload.categoryId].push({
                id: `${action.payload.categoryId.toLowerCase()}-chat-${state.categories[action.payload.categoryId].length}`,
                title: `New Chat ${state.categories[action.payload.categoryId].length}`,
                messages: []
            })
        },
        updateChatHeading: (state: ChatState, action: PayloadAction<{ heading: string }>) => {
            const chatIdx = state.categories[state.selectedChatInfo.category]?.findIndex(chat => chat.id === state.selectedChatInfo.id);

            if (chatIdx > -1) {
                state.categories[state.selectedChatInfo.category][chatIdx].title = action.payload.heading;
            }
        }
    },
});

export const {
    moveChatToCategory,
    addCategory,
    removeCategory,
    removeChat,
    sendMessage,
    addChat,
    updateChatHeading
} = sessionSlice.actions;

export default sessionSlice.reducer;
