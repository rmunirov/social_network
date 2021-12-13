import profileReducer, { addPost, deletePost } from './ProfileReducer';

const initialState = {
    posts: [
        { id: 1, message: 'Hi, broo', likesCount: 5 },
        { id: 2, message: 'How are you?', likesCount: 12 },
        { id: 3, message: "What's going on?", likesCount: 44 },
        { id: 4, message: 'My name is Yassya', likesCount: 7 },
    ],
};

test('posts length should be incremented on 1', () => {
    // 1. test data
    let state = initialState;
    const post = 'New post text';
    // 2. action
    const action = addPost(post);
    state = profileReducer(state, action);
    // 3.expectation
    expect(state.posts.length).toBe(5);
});

test('posts new message should be equal to `New post text`', () => {
    // 1. test data
    let state = initialState;
    const post = 'New post text';
    // 2. action
    const action = addPost(post);
    state = profileReducer(state, action);
    // 3.expectation
    expect(state.posts[4].message).toBe('New post text');
});

test('posts length should be decremented on 1', () => {
    // 1. test data
    let state = initialState;
    const postId = 1;
    // 2. action
    const action = deletePost(postId);
    state = profileReducer(state, action);
    // 3.expectation
    expect(state.posts.length).toBe(3);
});
