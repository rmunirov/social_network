import React from 'react'
import styles from './Posts.module.css'
import Post from "./Post/Post";
import {Field, Form} from "react-final-form";
import {TextArea} from "../../common/FormControls/FormControls";
import {composeValidators, maxLength, required} from "../../../utils/validators/validators";

const PostReduxForm = ({onSubmit}) => {
    return (
        <Form
            onSubmit={onSubmit}
            render={({handleSubmit}) => (
                <form onSubmit={handleSubmit}>
                    <div>
                        <Field name="newPostText"
                               validate={composeValidators(maxLength(10), required)}
                               component={TextArea}
                               placeholder="Enter new post text..."/>
                    </div>
                    <div>
                        <button type="submit">Add post</button>
                    </div>
                </form>
            )}
        />
    );
}

const Posts = React.memo(({posts, addPost}) => {
    const postsJSX = posts.map(message => <Post key={message.id}
                                                message={message.message}
                                                likeCount={message.likesCount}/>);

    const onAddPost = (formData) => {
        addPost(formData.newPostText);
    }

    return (
        <div className={styles.posts}>
            <h3>My posts</h3>
            <PostReduxForm onSubmit={onAddPost}/>
            <div className={styles.item}>
                {postsJSX}
            </div>
        </div>
    );
})

export default Posts;
