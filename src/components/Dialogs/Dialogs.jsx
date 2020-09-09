import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';

const Dialogs = (props) => {

  let dialogElement = props.state.dialogsData
      .map(i => <DialogItem name={i.name} id={i.id} />);

  let messageElement = props.state.messagesData
      .map(i => <Message message={i.message} />)

   let newMessageElement = React.createRef();
   let addMessage = () => {
     let text = newMessageElement.current.value;
     alert(text);
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

          <div className={s.createMessage}>
            <div>
              <textarea ref={ newMessageElement }></textarea>
            </div>
            <div>
              <button onClick={ addMessage }>Add</button>
            </div>
          </div>

        </div> 

        
      </div>
    )
}

export default Dialogs;