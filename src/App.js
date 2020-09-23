import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import { Route, BrowserRouter } from 'react-router-dom';
import DialogsContainer from './components/Dialogs/DialogsContainer';

function App(props) {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Header />
        <Navbar state={props.state.sidebar} />

        <div className="app-wrapper-content">
          <Route path='/profile' render={ () => <Profile 
            store={ props.store }
            /> } 
          />
          <Route path='/dialogs' render={ () => <DialogsContainer 
            store={ props.store }
            dialogPage={props.state.dialogPage} 
            dispatch={ props.dispatch }
          /> } 
          />
          <Route path='/news' />
          <Route path='/music' />
          <Route path='setting' />
        </div>
        
      </div>
    </BrowserRouter>
  );
}

export default App;