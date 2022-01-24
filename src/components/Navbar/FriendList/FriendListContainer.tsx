import { connect } from 'react-redux';
import { TAppState } from '../../../redux/store-redux';
import FriendList from './FriendList';

const mapStateToProps = (state: TAppState) => {
    return {
        friendList: state.sidebar.friends,
    };
};

const FriendListContainer = connect(mapStateToProps)(FriendList);

export default FriendListContainer;
