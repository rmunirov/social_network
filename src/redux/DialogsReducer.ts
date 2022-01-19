import { Dialog, Message } from '../types/types';

const ADD_MESSAGE = 'learn/dialogs/ADD_MESSAGE';

type DialogsState = {
    messages: Array<Message>;
    dialogs: Array<Dialog>;
};

const initialState = {
    messages: [
        { id: 1, message: 'Hello, broo', profileId: 1 },
        { id: 2, message: 'What is your name?', profileId: 1 },
        { id: 3, message: 'Do you have are problem, maaan?', profileId: 2 },
    ],
    dialogs: [
        { id: 1, name: 'Ilnur' },
        { id: 2, name: 'Dunar' },
        { id: 3, name: 'Vital' },
        { id: 4, name: 'Rustam' },
    ],
};

const dialogsReducer = (state: DialogsState = initialState, action: any) => {
    switch (action.type) {
        case ADD_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, { id: 4, message: action.payload, profileId: 1 }],
            };

        default:
            return state;
    }
};

type AddMessageActionType = {
    type: typeof ADD_MESSAGE;
    payload: string;
};

export const addMessage = (newMessageText: string): AddMessageActionType => ({
    type: ADD_MESSAGE,
    payload: newMessageText,
});

export default dialogsReducer;
