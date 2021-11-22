import store from './redux/redux-store';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
// import { Provider } from './StoreContext';

let rerenderEntireTree = (state) => {
  ReactDOM.render(
    <React.StrictMode>
      {/* <StoreContext.Provider value={ store } > */}
        <Provider store={ store }>
          <App state={ state }/>
        </Provider>
      {/* </StoreContext.Provider> */}
    </React.StrictMode>,
    document.getElementById('root')
  ); 
}


rerenderEntireTree(store.getState());

// Якщо відбуваються якісь зміни то викликається ця функція
// store.subscribe(rerenderEntireTree);
store.subscribe(() => {
  // отримуємо нові данні зі стора 
  let state = store.getState();
  rerenderEntireTree(state);
});

serviceWorker.unregister();
