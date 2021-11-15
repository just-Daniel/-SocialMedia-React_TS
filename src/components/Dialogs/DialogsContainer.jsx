// import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { addMessageActionCreator } from '../../redux/dialog-reducer';
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (newMessage) => {
      dispatch(addMessageActionCreator(newMessage))
    }
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(Dialogs);