import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { getUserProfile } from '../../redux/profile-reducer';
import { withRouter } from 'react-router';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';

class ProfileContainer extends React.Component { 

  componentDidMount() {
    let userId = this.props.match.params.userId
    if(!userId) {
      userId = 2
    }

    this.props.getUserProfile(userId);
  }

  render() {
    return (
      <Profile { ...this.props } profile={this.props.profile} />
    )
  }
}

const AuthRedirectComponent = withAuthRedirect(ProfileContainer);

const mapStateToProps = state => ({
  profile: state.profilePage.profile
})

const mapDispatchToProps = {
  getUserProfile
}

const WithUrlDataContainerComponent = withRouter(AuthRedirectComponent);

export default connect(mapStateToProps, mapDispatchToProps)(WithUrlDataContainerComponent);