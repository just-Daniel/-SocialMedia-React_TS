import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';

const Dialogs = (props) => {

  let dialogElement = props.state.dialogsData
      .map(i => <DialogItem name={i.name} id={i.id} />);

  let messageElement = props.state.messagesData
      .map(i => <Message message={i.message} />)

    return (
       <div className={s.dialogs}>
        <div className={s.dialogs_items}>
          { dialogElement }
        </div>

        <div className={s.messages}>
          { messageElement }
        </div> 
      </div>
    )
}

export default Dialogs;