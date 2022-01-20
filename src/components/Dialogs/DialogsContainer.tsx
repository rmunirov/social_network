import { connect } from 'react-redux';
import { compose } from 'redux';
import { addMessage } from '../../redux/DialogsReducer';
import withAuthRedirect from '../../hoc/withAuthRedirect';
import { TAppState } from '../../redux/store-redux';
import { TDialog, TMessage } from '../../types/types';
import Dialogs from './Dialogs';

const mapStateToProps = (state: TAppState) => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
    };
};

const mapDispatchToProps = {
    addMessage,
};

type TStateProps = {
    dialogs: Array<TDialog>;
    messages: Array<TMessage>;
};

type TDispatchProps = {
    addMessage: (message: string) => void;
};

type TOwnProps = {
    title: string;
};

export default compose(
    connect<TStateProps, TDispatchProps, TOwnProps, TAppState>(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs);
