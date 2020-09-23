import React from 'react';
import {addMessageActionCreator, updateMessageActionCreator } from '../../redux/dialog-reducer';
import Dialogs from './Dialogs';

const DialogsContainer = (props) => {
  debugger;
  let state = props.store.getState().dialogPage;

   let addMessage = () => {
    props.store.dispatch(addMessageActionCreator())
   }

   const onMessageChange = (text) => {
    props.store.dispatch(updateMessageActionCreator(text))
   };

    return <Dialogs 
              addMessage={ addMessage }
              changeMessage={ onMessageChange }
              dialogsPage={ state }
      />
}

export default DialogsContainer;