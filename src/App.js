import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import { Route, BrowserRouter } from 'react-router-dom';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import Users from './components/Users/Users';

function App(props) {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Header />
        <Navbar state={props.state.sidebar} />

        <div className="app-wrapper-content">
          <Route path='/profile' render={ () => <Profile /> } />
          <Route path='/dialogs' render={ () => <DialogsContainer /> } />
          <Route path='/news' />
          <Route path='/music' />
          <Route path='/setting' />
          <Route path='/users' render={ ()=> <Users /> } />
        </div>
        
      </div>
    </BrowserRouter>
  );
}

export default App;