import { connect } from 'react-redux';
import FriendList from './FriendList';

const mapStateToProps = (state) => {
    return {
        friendList: state.sidebar.friends,
    };
};

const mapDispatchToProps = () => {
    return {};
};

const FriendListContainer = connect(mapStateToProps, mapDispatchToProps)(FriendList);

export default FriendListContainer;
