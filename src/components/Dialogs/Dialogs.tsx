import React, { FC } from 'react';
import { Field, Form } from 'react-final-form';
import classNames from 'classnames/bind';
import { composeValidators, maxLength, required } from '../../utils/validators/validators';
import { TextArea } from '../common/FormControls/FormControls';
import { TDialog, TMessage } from '../../types/types';
import styles from './Dialogs.module.scss';
import Message from './Message/Message';
import DialogItem from './DialogItem/DialogItem';

const cn = classNames.bind(styles);
const CLASS_NAME = 'Dialogs';

type MessageReduxFormProps = {
    onSubmit: (formData: any) => void;
    className: any;
};

const MessageReduxForm: FC<MessageReduxFormProps> = ({ onSubmit }) => {
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

type DialogProps = {
    dialogs: Array<TDialog>;
    messages: Array<TMessage>;
    addMessage: (message: string) => void;
};

const Dialogs: FC<DialogProps> = ({ dialogs, messages, addMessage }) => {
    const myProfileId = 1;
    const dialogsElement = dialogs.map((dialog) => (
        <DialogItem key={dialog.id} name={dialog.name} id={dialog.id} />
    ));
    const messagesElement = messages.map((message) => (
        <Message
            key={message.id}
            message={message.message}
            profileId={message.profileId}
            myProfileId={myProfileId}
        />
    ));

    const onAddMessage = (formData: any) => {
        addMessage(formData.newMessageText);
    };

    return (
        <div className={cn(CLASS_NAME)}>
            <div className={cn(`${CLASS_NAME}__dialogItems`)}>{dialogsElement}</div>
            <div className={cn(`${CLASS_NAME}__messages`)}>{messagesElement}</div>
            <MessageReduxForm className={cn(`${CLASS_NAME}__newMessage`)} onSubmit={onAddMessage} />
        </div>
    );
};

export default Dialogs;
