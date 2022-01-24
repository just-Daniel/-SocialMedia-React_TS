import React from 'react';
import Preloader from '../../common/Preloader/Preloader';
import s from './ProfileInfo.module.css';
import ProfileStatus from './ProfileStatus';
import defaultUserPhoto from '../../../assets/user.png';
import { useState } from 'react';
import ProfileDataFormReduxForm from './ProfileDataForm';

const ProfileInfo = (props) => {
  const [editMode, setEditMode] = useState(false);

  if(!props.profile) {
    return <Preloader />
  }

  const onMainPhotoSelected = (e) => {
    if(e.target.files.length) {
      props.savePhoto(e.target.files[0])
    }
  }

  const onProfileEditSubmit = (data) => {
    props.saveProfile(data).then(() => setEditMode(false) );
    
  }
  
    return (
       <div>
        {/* <div>
          <img src="https://d1qq9lwf5ow8iz.cloudfront.net/live-images-1/ImageDetail_76396138-4384-438f-ae4a-04aadaa159cb_ThreeByOne?v=636752871108092553" alt="San Francisco"/>
        </div> */}
        <div className={ s.descriptionBlock }>
          <img className={s.profileImage} src={props.profile.photos.large || defaultUserPhoto} alt="profile img" />
          { props.isOwner && <input type='file' onChange={onMainPhotoSelected} /> }

          {
            editMode
            ? <ProfileDataFormReduxForm 
                initialValues={ props.profile }
                profile={ props.profile } 
                onSubmit={ onProfileEditSubmit }
              />
            : <ProfileData 
                profile={ props.profile } 
                goToEditMode={ () => setEditMode(true) }
                isOwner={ props.isOwner }
              />
          }

          <ProfileStatus 
            status={ props.status } 
            updateStatus={ props.updateStatus }
          />
        </div>
      </div>
    )
}

const ProfileData = props => {
  return (
    <div>
      {
        props.isOwner &&
        <div><button onClick={props.goToEditMode}>edit</button></div>
      }
      <div>
        <b>Full name</b>: {props.profile.fullName}
      </div>

      <div>
        <b>Looking for a job</b>: {props.profile.lookingForAJob ? 'yes' : 'no'}
      </div>
      {
        props.profile.lookingForAJob &&
        <div>
          <b>My professionals skills</b>: {props.profile.lookingForAJobDescription}
        </div>
      }
      <div>
        <b>About me</b>: {props.profile.aboutMe}
      </div>
      <div>
        <b>Contacts</b>: {
          Object.keys(props.profile.contacts).map(key => {
            return <Contact 
              key={key+props.profile.contacts[key]}
              contactTitle={key}
              contactValue={props.profile.contacts[key]}
            />
          })
          }
      </div>
    </div>
  )
}



const Contact = ({contactTitle, contactValue}) => {
  return (
    <div className={s.contact}>
      <b>{ contactTitle }</b>: { contactValue }
    </div>
  )
}

export default ProfileInfo;