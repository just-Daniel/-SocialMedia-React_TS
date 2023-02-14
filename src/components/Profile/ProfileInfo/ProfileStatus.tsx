import React, { ChangeEvent, FC, useEffect, useState } from 'react';

type PropsType = {
    status: string
    updateStatus: (status: string) => void
}

const ProfileStatus: FC<PropsType> = props => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [status, setStatus] = useState<string>(props.status)
 
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

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
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