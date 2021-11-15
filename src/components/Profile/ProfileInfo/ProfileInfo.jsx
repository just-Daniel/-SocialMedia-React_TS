import React from 'react';
import Preloader from '../../common/Preloader/Preloader';
import s from './ProfileInfo.module.css';
import ProfileStatus from './ProfileStatus';

const ProfileInfo = (props) => {
  if(!props.profile) {
    return <Preloader />
  }
  
    return (
       <div>
        <div>
          <img src="https://d1qq9lwf5ow8iz.cloudfront.net/live-images-1/ImageDetail_76396138-4384-438f-ae4a-04aadaa159cb_ThreeByOne?v=636752871108092553" alt="San Francisco"/>
        </div>
        <div className={ s.descriptionBlock }>
          <img src={props.profile.photos.large} alt="profile img" />
          <ProfileStatus 
            status={ props.status } 
            updateStatus={ props.updateStatus }
          />
        </div>
      </div>
    )
}

export default ProfileInfo;