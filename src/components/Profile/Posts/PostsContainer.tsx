import { connect } from 'react-redux';
import { addPost } from '../../../redux/ProfileReducer';
import { TAppState } from '../../../redux/store-redux';
import Posts from './Posts';

const mapStateToProps = (state: TAppState) => {
    return {
        posts: state.profilePage.posts,
    };
};

const mapDispatchToProps = {
    addPost,
};

const PostsContainer = connect(mapStateToProps, mapDispatchToProps)(Posts);

export default PostsContainer;
