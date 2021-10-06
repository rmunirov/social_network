import dialogsReducer from "./DialogsReducer";
import profileReducer from "./ProfileReducer";
import sidebarReducer from "./SidebarReducer";

let store = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'Hi, broo', likesCount: 5},
                {id: 2, message: 'How are you?', likesCount: 12},
                {id: 3, message: 'What\'s going on?', likesCount: 44},
                {id: 4, message: 'My name is Yassya', likesCount: 7}
            ],
            newPost: '',
        },

        dialogsPage: {
            messages: [
                {id: 1, message: 'Hello, broo', profileId: 1},
                {id: 2, message: 'What is your name?', profileId: 1},
                {id: 3, message: 'Do you have are problem, maaan?', profileId: 2}
            ],
            dialogs: [
                {id: 1, name: 'Ilnur'},
                {id: 2, name: 'Dunar'},
                {id: 3, name: 'Vital'},
                {id: 4, name: 'Rustam'},
            ],
            newMessage: '',
        },

        sidebar: {
            friends: [
                {id: 1, name: 'Ilnur', age: 32},
                {id: 2, name: 'Dunar', age: 32},
                {id: 3, name: 'Vital', age: 33},
                {id: 4, name: 'Rustam', age: 33},
            ]
        }
    },
    _callSubscriber() {
    },

    getState() {
        return this._state;
    },

    subscribe(observer) {
        this._callSubscriber = observer;
    },

    dispatch(action) {
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);
        this._callSubscriber(this._state);
    },
}

export default store;
