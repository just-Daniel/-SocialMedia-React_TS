import React from 'react';
import s from './ProfileInfo.module.css';

const ProfileInfo = () => {
    return (
       <div>
        <div>
          <img src="https://d1qq9lwf5ow8iz.cloudfront.net/live-images-1/ImageDetail_76396138-4384-438f-ae4a-04aadaa159cb_ThreeByOne?v=636752871108092553" alt="San Francisco"/>
        </div>
        <div className={ s.descriptionBlock }>
          avatar + description
        </div>
      </div>
    )
}

export default ProfileInfo;