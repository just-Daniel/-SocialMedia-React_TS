import React from 'react';
import { reduxForm } from 'redux-form';
import { createField, Input, Textarea } from '../../common/FormControls/FormControls';

const ProfileDataForm = props => {
    console.log('PROPS: ', props);
    return (
      <form onSubmit={props.handleSubmit}>
      <div><button>Save</button></div>
      { 
        props.error && 
        <div /*className={styles.formSummaryError}*/>
            { props.error }
        </div>
      }

      <div>
        <b>Full name</b>: { createField(Input, [], 'fullName', 'Full name') }
      </div>

      <div>
        <b>Looking for a job</b>: { createField(Input, [], 'lookingForAJob', '', {type: 'checkbox'}) }
      </div>
      
      <div>
        <b>My professionals skills</b>: { createField(Textarea, [], 'lookingForAJobDescription', 'My professionals skills') }
      </div>
      
      <div>
        <b>About me</b>: { createField(Input, [], 'aboutMe', 'About me') }
      </div>
      <div>
        <b>Contacts</b>: {
          Object.keys(props.profile.contacts).map(key => {
            return <div
              key={key+props.profile.contacts[key]}
            >
                <b>{key}:</b> { createField(Input, [], 'contact.' + key, 'Full name') }
            </div>
          })
          }
      </div>
    </form>
    )
}

const ProfileDataFormReduxForm = reduxForm({form: 'edit-profile'})(ProfileDataForm);

export default ProfileDataFormReduxForm;