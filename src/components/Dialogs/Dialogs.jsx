import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import { Redirect } from 'react-router';

const Dialogs = (props) => {
  let dialogElement = props.dialogsPage.dialogsData
      .map(i => <DialogItem name={i.name} id={i.id} key={i.id} />);

  let messageElement = props.dialogsPage.messagesData
      .map(i => <Message message={i.message} key={i.id} />);


   let onAddMessage = () => {
    props.addMessage();
   }

   const onMessageChange = (element) => {
    let text = element.target.value;
    props.changeMessage(text)
   };

   if (!props.isAuth) return <Redirect to='/login' />

    return (
       <div className={s.dialogs}>
        <div className={s.dialogs_items}>
          { dialogElement }
        </div>

        <div className={s.messages}>
          <div>
            { messageElement }
          </div>

          <div className={s.createMessage}>
            <div>
              <textarea 
                        value={ props.dialogsPage.newMessageText }
                        onChange={ onMessageChange }
                        placeholder='Enter your message'
              />
            </div>
            <div>
              <button onClick={ onAddMessage }>Send</button>
            </div>
          </div>

        </div> 

        
      </div>
    )
}

export default Dialogs;