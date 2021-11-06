import React from 'react';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import ProfileContainer from './components/Profile/ProfileContainer';
import { Route, BrowserRouter } from 'react-router-dom';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import LoginContainer from './components/Login/Login';

function App(props) {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <HeaderContainer />
        <Navbar state={props.state.sidebar} />

        <div className="app-wrapper-content">
          {/*  : вказуєм параметр, ? говоримо, що він не обов'язковий */}
          <Route path='/profile/:userId?' render={ () => <ProfileContainer /> } />
          <Route path='/dialogs' render={ () => <DialogsContainer /> } />
          <Route path='/news' />
          <Route path='/music' />
          <Route path='/setting' />
          <Route path='/users' render={ ()=> <UsersContainer /> } />
          <Route path='/login' render={ () => <LoginContainer /> } />
        </div>
        
      </div>
    </BrowserRouter>
  );
}

export default App;