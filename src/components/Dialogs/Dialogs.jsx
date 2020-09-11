import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import {addMessageActionCreator, updateMessageActionCreator } from '../../redax/dialog-reducer';

const Dialogs = (props) => {
  console.log(props);

  let dialogElement = props.dialogPage.dialogsData
      .map(i => <DialogItem name={i.name} id={i.id} />);

  let messageElement = props.dialogPage.messagesData
      .map(i => <Message message={i.message} />);


   let addMessage = () => {
    props.dispatch(addMessageActionCreator())
   }
    //let newMessageElement = React.createRef();
   const onMessageChange = (element) => {
    // let text = newMessageElement.current.value;
    let text = element.target.value;
    props.dispatch(updateMessageActionCreator(text))
   };

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
              <textarea //ref={ newMessageElement }
                        value={ props.dialogPage.newMessageText }
                        onChange={ onMessageChange }
                        placeholder='Enter your message'
              />
            </div>
            <div>
              <button onClick={ addMessage }>Send</button>
            </div>
          </div>

        </div> 

        
      </div>
    )
}

export default Dialogs;