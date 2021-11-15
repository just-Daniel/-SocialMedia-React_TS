import React, { useEffect, useState } from 'react';

const ProfileStatus = props => {
    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status)
 
    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);

    const activateEditMode = () => {
        setEditMode(true);
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value);
    }

    return (
        <>  
            {
                !editMode 
                ? <div>
                    <span onDoubleClick={ activateEditMode }
                    >{'Status: '+ props.status || '-----'}</span>
                  </div>
                
                : <div>
                    <input 
                        onBlur={ deactivateEditMode } 
                        autoFocus={ true }
                        value={ status } 
                        onChange={ onStatusChange }
                    />
                  </div>      
            }
        </>
    )
}

export default ProfileStatus;