import { connect } from 'react-redux';
import { addPost } from '../../../redux/ProfileReducer';
import Posts from './Posts';

const mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
    };
};

const mapDispatchToProps = {
    addPost,
};

const PostsContainer = connect(mapStateToProps, mapDispatchToProps)(Posts);

export default PostsContainer;
