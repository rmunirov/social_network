import React from 'react';
import { Field, Form } from 'react-final-form';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { composeValidators, maxLength, required } from '../../utils/validators/validators';
import { TextArea } from '../common/FormControls/FormControls';
import styles from './Dialogs.module.scss';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';

const cn = classNames.bind(styles);
const CLASS_NAME = 'Dialogs';

const MessageReduxForm = ({ onSubmit }) => {
    return (
        <Form
            onSubmit={onSubmit}
            render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <div>
                        <Field
                            name="newMessageText"
                            validate={composeValidators(maxLength(10), required)}
                            component={TextArea}
                            placeholder="Enter new message text..."
                        />
                    </div>
                    <div>
                        <button type="submit">Send</button>
                    </div>
                </form>
            )}
        />
    );
};

MessageReduxForm.propTypes = {
    onSubmit: PropTypes.func,
};

const Dialogs = (props) => {
    const myProfileId = 1;
    const dialogs = props.dialogs.map((dialog) => (
        <DialogItem key={dialog.id} name={dialog.name} id={dialog.id} />
    ));
    const messages = props.messages.map((message) => (
        <Message
            key={message.id}
            message={message.message}
            profileId={message.profileId}
            myProfileId={myProfileId}
        />
    ));

    const onAddMessage = (formData) => {
        props.addMessage(formData.newMessageText);
    };

    return (
        <div className={cn(CLASS_NAME)}>
            <div className={cn(`${CLASS_NAME}__dialogItems`)}>{dialogs}</div>
            <div className={cn(`${CLASS_NAME}__messages`)}>{messages}</div>
            <MessageReduxForm className={cn(`${CLASS_NAME}__newMessage`)} onSubmit={onAddMessage} />
        </div>
    );
};

Dialogs.propTypes = {
    dialogs: PropTypes.array,
    messages: PropTypes.array,
    addMessage: PropTypes.func,
};

export default Dialogs;
