import React from 'react';
import {addMessageActionCreator, updateMessageActionCreator } from '../../redux/dialog-reducer';
import StoreContext from '../../StoreContext';
import Dialogs from './Dialogs';

const DialogsContainer = () => {

  return (
    <StoreContext.Consumer>
      { (store) => {
          let state = store.getState().dialogPage;

          let addMessage = () => {
            store.dispatch(addMessageActionCreator())
          }

          const onMessageChange = (text) => {
            store.dispatch(updateMessageActionCreator(text))
          };

            return <Dialogs 
                      addMessage={ addMessage }
                      changeMessage={ onMessageChange }
                      dialogsPage={ state }
            />
        }
      }
    </StoreContext.Consumer>
  )
}

export default DialogsContainer;