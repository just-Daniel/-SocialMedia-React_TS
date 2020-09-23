import store from './redux/redux-store';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

let rerenderEntireTree = (state) => {
  debugger
  ReactDOM.render(
    <React.StrictMode>
      <App  state={ state } 
            dispatch={ store.dispatch.bind(store) }
            store={ store }
      />
    </React.StrictMode>,
    document.getElementById('root')
  ); 
}


rerenderEntireTree(store.getState());

// Якщо відбуваються якісь зміни то викликається ця функція
// store.subscribe(rerenderEntireTree);
store.subscribe(() => {
  // отримуєсо нові данні зі стора 
  let state = store.getState();
  rerenderEntireTree(state);
});

serviceWorker.unregister();
