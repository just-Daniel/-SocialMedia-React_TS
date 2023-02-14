import React, {lazy} from 'react';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import ProfileContainer from './components/Profile/ProfileContainer';
import { Route } from 'react-router-dom';
import UsersContainer from './components/Users/UsersContainer';
import LoginContainer from './components/Login/Login';
import { connect } from 'react-redux';
import { initializeApp } from './redux/app-reducer';
import Preloader from './components/common/Preloader/Preloader';
import { withSuspense } from './hoc/withSuspense';

// import DialogsContainer from './components/Dialogs/DialogsContainer';
const DialogsContainer = lazy(() => import('./components/Dialogs/DialogsContainer'));

class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp()
  }
  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }
    
    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <Navbar state={this.props.state.sidebar} />
        
        {/* <Suspense fallback={<div>Loading...</div>}> */}
          <div className="app-wrapper-content">
            {/*  : вказуєм параметр, ? говоримо, що він не обов'язковий */}
            <Route path='/profile/:userId?' render={ () => <ProfileContainer /> } />
            <Route path='/dialogs' render={ withSuspense(DialogsContainer) } />
            <Route path='/news' />
            <Route path='/music' />
            <Route path='/setting' />
            <Route path='/users' render={ ()=> <UsersContainer /> } />
            <Route path='/login' render={ () => <LoginContainer /> } />
          </div>
        {/* </Suspense> */}
        
      </div>
    );
  }
}

const mapStateToProps = state => ({
  initialized: state.app.initialized
})

export default connect(mapStateToProps, {initializeApp})(App);