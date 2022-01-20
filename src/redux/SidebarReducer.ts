import { TFriend } from '../types/types';

type SidebarState = {
    friends: Array<TFriend>;
};

const initialState: SidebarState = {
    friends: [
        { id: 1, name: 'Ilnur', age: 32 },
        { id: 2, name: 'Dunar', age: 32 },
        { id: 3, name: 'Vital', age: 33 },
        { id: 4, name: 'Rustam', age: 33 },
    ],
};

const sidebarReducer = (state: SidebarState = initialState) => {
    return state;
};

export default sidebarReducer;
