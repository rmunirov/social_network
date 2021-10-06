const initialState = {
    friends: [
        {id: 1, name: 'Ilnur', age: 32},
        {id: 2, name: 'Dunar', age: 32},
        {id: 3, name: 'Vital', age: 33},
        {id: 4, name: 'Rustam', age: 33},
    ]
};

const sidebarReducer = (state = initialState, action = {}) => {
    return state;
}

export default sidebarReducer;
