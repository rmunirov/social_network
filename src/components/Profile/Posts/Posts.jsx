import React from 'react';
import { Field, Form } from 'react-final-form';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { TextArea } from '../../common/FormControls/FormControls';
import { composeValidators, maxLength, required } from '../../../utils/validators/validators';
import Post from './Post/Post';
import styles from './Posts.module.scss';

const cn = classNames.bind(styles);
const CLASS_NAME = 'Posts';

const PostReduxForm = ({ onSubmit }) => {
    return (
        <Form
            onSubmit={onSubmit}
            render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <div>
                        <Field
                            name="newPostText"
                            validate={composeValidators(maxLength(10), required)}
                            component={TextArea}
                            placeholder="Enter new post text..."
                        />
                    </div>
                    <div>
                        <button type="submit">Add post</button>
                    </div>
                </form>
            )}
        />
    );
};

PostReduxForm.propTypes = {
    onSubmit: PropTypes.func,
};

const Posts = React.memo(({ posts, addPost }) => {
    const postsJSX = posts.map((message) => (
        <Post key={message.id} message={message.message} likeCount={message.likesCount} />
    ));

    const onAddPost = (formData) => {
        addPost(formData.newPostText);
    };

    return (
        <div className={cn(CLASS_NAME)}>
            <h3>My posts</h3>
            <PostReduxForm onSubmit={onAddPost} />
            <div className={cn(`${CLASS_NAME}__item`)}>{postsJSX}</div>
        </div>
    );
});

Posts.propTypes = {
    posts: PropTypes.array,
    addPost: PropTypes.func,
};

Posts.displayName = 'Posts';

export default Posts;
