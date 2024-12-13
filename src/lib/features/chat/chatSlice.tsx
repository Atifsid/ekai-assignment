import { CATEGORIES, CATEGORY_ACCENT_COLORS, CATEGORY_BG_COLORS, CATEGORY_FONT_COLORS } from '@/src/helpers/constants/constant';
import { generateFontAndAccentColors, getRandomHexColor } from '@/src/helpers/constants/functions';
import { Chat } from '@/src/helpers/model/Chat';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ChatState {
    selectedChatInfo: { categoryId: string, chatId: string };
    categories: {
        [categoryId: string]: Array<Chat>;
    };
    categoryBgColors: {
        [key: string]: string;
    },
    categoryTextColors: {
        [key: string]: string;
    }
    categoryAccentColors: {
        [key: string]: string;
    }
}

const initialState: ChatState = {
    selectedChatInfo: {
        categoryId: 'Work',
        chatId: 'work-chat-1',
    },
    categories: CATEGORIES,
    categoryBgColors: CATEGORY_BG_COLORS,
    categoryTextColors: CATEGORY_FONT_COLORS,
    categoryAccentColors: CATEGORY_ACCENT_COLORS
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        moveChatToCategory: (state: ChatState, action: PayloadAction<{ chatId: string; categoryId: string }>) => {
            const { chatId, categoryId } = action.payload;
            state.selectedChatInfo = {
                categoryId: action.payload.categoryId,
                chatId: action.payload.chatId
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

            const newColor = getRandomHexColor();
            const { fontColor, accentColor } = generateFontAndAccentColors(newColor);
            // bg color
            const updatedBgColors = { ...state.categoryBgColors };
            updatedBgColors[action.payload.newCategoryId] = newColor;
            state.categoryBgColors = { ...updatedBgColors };

            // font color
            const updatedFontColors = { ...state.categoryTextColors };
            updatedFontColors[action.payload.newCategoryId] = fontColor;
            state.categoryTextColors = { ...updatedFontColors };

            // accent color
            const updateAccesntColors = { ...state.categoryAccentColors };
            updateAccesntColors[action.payload.newCategoryId] = accentColor;
            state.categoryAccentColors = { ...updateAccesntColors };
        },
        removeCategory: (state: ChatState, action: PayloadAction<{ categoryIdToRemove: string }>) => {
            if (state.categories[action.payload.categoryIdToRemove]) {
                delete state.categories[action.payload.categoryIdToRemove];
                state.selectedChatInfo.categoryId = '';
                state.selectedChatInfo.chatId = '';
            }
        },
        removeChat: (state: ChatState, action: PayloadAction<{ categoryId: string; chatIdToRemove: string }>) => {
            const chatIdxToRemove = state.categories[action.payload.categoryId]?.findIndex(chat => chat.id === action.payload.chatIdToRemove);

            if (chatIdxToRemove > -1) {
                state.categories[action.payload.categoryId].splice(chatIdxToRemove, 1);
                state.selectedChatInfo.categoryId = '';
                state.selectedChatInfo.chatId = '';
            }
        },
        sendMessage: (state: ChatState, action: PayloadAction<{ question: string }>) => {
            const chatIdx = state.categories[state.selectedChatInfo.categoryId].findIndex(chat => chat.id === state.selectedChatInfo.chatId);
            state.categories[state.selectedChatInfo.categoryId][chatIdx].messages.push({ question: action.payload.question, answer: `Answer mock up for: ${action.payload.question}` });
        },
        addChat: (state: ChatState, action: PayloadAction<{ categoryId: string }>) => {
            state.categories[action.payload.categoryId].push({
                id: `${action.payload.categoryId.toLowerCase()}-chat-${state.categories[action.payload.categoryId].length}`,
                title: `New Chat ${state.categories[action.payload.categoryId].length}`,
                messages: []
            })
        },
        updateChatHeading: (state: ChatState, action: PayloadAction<{ heading: string }>) => {
            const chatIdx = state.categories[state.selectedChatInfo.categoryId]?.findIndex(chat => chat.id === state.selectedChatInfo.chatId);

            if (chatIdx > -1) {
                state.categories[state.selectedChatInfo.categoryId][chatIdx].title = action.payload.heading;
            }
        },
        updateSelectedChat: (state: ChatState, action: PayloadAction<{ chatId: string; categoryId: string }>) => {
            state.selectedChatInfo = {
                chatId: action.payload.chatId,
                categoryId: action.payload.categoryId
            }
        },
        updateCategoryBgColor: (state: ChatState, action: PayloadAction<{ categoryId: string; colorHex: string }>) => {
            const updateCategoryBgColor = { ...state.categoryBgColors };
            updateCategoryBgColor[action.payload.categoryId] = action.payload.colorHex;
            state.categoryBgColors = { ...updateCategoryBgColor };
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
    updateChatHeading,
    updateSelectedChat,
    updateCategoryBgColor
} = chatSlice.actions;

export default chatSlice.reducer;
