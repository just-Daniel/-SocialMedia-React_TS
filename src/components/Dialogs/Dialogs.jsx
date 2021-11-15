import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import { Field, reduxForm } from 'redux-form';
import { Textarea } from '../common/FormControls/FormControls';
import { maxLengthCreator, required } from '../../utils/validators/validators';

const maxLength50 = maxLengthCreator(50)

const Dialogs = (props) => {
  let dialogElement = props.dialogsPage.dialogsData
      .map(i => <DialogItem name={i.name} id={i.id} key={i.id} />);

  let messageElement = props.dialogsPage.messagesData
      .map(i => <Message message={i.message} key={i.id} />);


   let onAddMessage = value => {
    props.sendMessage(value.newMessageBody);
   }


    return (
       <div className={s.dialogs}>
        <div className={s.dialogs_items}>
          { dialogElement }
        </div>

        <div className={s.messages}>
          <div>
            { messageElement }
          </div>

          <AddMessageForm onSubmit={onAddMessage} />

        </div> 

        
      </div>
    )
}

let AddMessageForm = props => {
  return (
    <form onSubmit={props.handleSubmit} className={s.createMessage}>
      <div>
        <Field 
          component={ Textarea }
          name='newMessageBody'
          placeholder='Enter your message'
          validate={[required, maxLength50]}
        />
      </div>
      <div>
        <button>Send</button>
      </div>
    </form>
  )
}

AddMessageForm = reduxForm({form: 'dialogsAddMessageForm'})(AddMessageForm)


export default Dialogs;