import React from 'react'
import styles from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Field, Form} from "react-final-form";
import {composeValidators, maxLength, required} from "../../utils/validators/validators";
import {TextArea} from "../common/FormControls/FormControls";

const MessageReduxForm = ({onSubmit}) => {
    return (
        <Form
            onSubmit={onSubmit}
            render={({handleSubmit}) => (
                <form onSubmit={handleSubmit}>
                    <div>
                        <Field name="newMessageText"
                               validate={composeValidators(maxLength(10), required)}
                               component={TextArea}
                               placeholder="Enter new message text..."/>
                    </div>
                    <div>
                        <button type="submit">Send</button>
                    </div>
                </form>
            )}
        />
    );
}

const Dialogs = (props) => {
    const myProfileId = 1;
    const dialogs = props.dialogs.map(dialog => <DialogItem name={dialog.name} id={dialog.id}/>)
    const messages = props.messages.map(message => <Message
        message={message.message}
        profileId={message.profileId}
        myProfileId={myProfileId}/>)

    const onAddMessage = (formData) => {
        props.addMessage(formData.newMessageText);
    }

    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogItems}>
                {dialogs}
            </div>
            <div className={styles.messages}>
                {messages}
            </div>
            <MessageReduxForm className={styles.new_message} onSubmit={onAddMessage}/>
        </div>
    );
}

export default Dialogs;
