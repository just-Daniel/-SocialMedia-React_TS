// import React from 'react';
import { connect } from 'react-redux';
import {addMessageActionCreator, updateMessageActionCreator } from '../../redux/dialog-reducer';
// import store from '../../redux/redux-store';
// import StoreContext from '../../StoreContext';
import Dialogs from './Dialogs';

// const DialogsContainer = () => {

//   return (
//     <StoreContext.Consumer>
//       { (store) => {
//           let state = store.getState().dialogPage;

//           let addMessage = () => {
//             store.dispatch(addMessageActionCreator())
//           }

//           const onMessageChange = (text) => {
//             store.dispatch(updateMessageActionCreator(text))
//           };

//             return <Dialogs 
//                       addMessage={ addMessage }
//                       changeMessage={ onMessageChange }
//                       dialogsPage={ state }
//             />
//         }
//       }
//     </StoreContext.Consumer>
//   )
// }


const mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogPage,
    isAuth: state.auth.isAuth 
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addMessage: () => {
      dispatch(addMessageActionCreator())
    },
    changeMessage: (text) => {
      dispatch(updateMessageActionCreator(text))
    }
  }
}


const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);


export default DialogsContainer;