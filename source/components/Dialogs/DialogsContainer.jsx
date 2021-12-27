import { connect } from 'react-redux';
import { compose } from 'redux';
import { addMessage } from '../../redux/DialogsReducer';
import withAuthRedirect from '../../hoc/withAuthRedirect';
import Dialogs from './Dialogs';

const mapStateToProps = (state) => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
    };
};

const mapDispatchToProps = {
    addMessage,
};

export default compose(connect(mapStateToProps, mapDispatchToProps), withAuthRedirect)(Dialogs);
