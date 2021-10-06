import React, {useEffect, useState} from "react";

const ProfileStatus = ({status, setStatus}) => {
    const [editMode, setEditMode] = useState(false);
    const [localStatus, setLocalStatus] = useState(status);

    useEffect(() => {
        setLocalStatus(status);
    }, [status]);

    const activateEditMode = () => {
        setEditMode(true);
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        setStatus(localStatus);
    }

    const onChangeStatus = (e) => {
        setLocalStatus(e.target.value);
    }

    return (
        <div>
            {!editMode &&
            <div>
                <span onDoubleClick={activateEditMode}>{status || "Your status is here..."}</span>
            </div>
            }
            {editMode &&
            <div>
                <input autoFocus={true}
                       onBlur={deactivateEditMode}
                       value={localStatus}
                       onChange={onChangeStatus}
                />
            </div>
            }
        </div>
    );
}

export default ProfileStatus;
