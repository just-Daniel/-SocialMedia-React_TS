import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Dialogs from './components/Dialogs/Dialogs';
import { Route, BrowserRouter } from 'react-router-dom';

function App(props) {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Header />
        <Navbar state={props.state.sidebar} />

        <div className="app-wrapper-content">
          <Route path='/profile' render={ () => <Profile 
            state={ props.state.profilePage } /> } 
          />
          <Route path='/dialogs' render={ () => <Dialogs 
            state={props.state.dialogPage} 
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