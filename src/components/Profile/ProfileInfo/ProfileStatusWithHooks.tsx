import React, {ChangeEvent, useEffect, useState} from "react";
import writeStatus from '../../../assets/images/writestatus.png'
import s from './ProfileStatusWithHooks.module.css'

type ProfileStatusType = {
    status: string
    updateStatus: (status: string) => void

}

const ProfileStatusWithHooks = (props: ProfileStatusType) => {

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div>
            {!editMode &&
                <div>
                    <b>Status:</b> <span onDoubleClick={activateEditMode}>{props.status ||
                    <span className={s.noStatus}>Write your status <img src={writeStatus}
                                                                        alt={'write status'}/></span>}</span>
                </div>
            }
            {editMode &&
                <div>
                    <input onChange={onStatusChange}
                           autoFocus={true}
                           onBlur={deactivateEditMode}
                           value={status}
                           placeholder={'Write status'}/>
                </div>
            }
        </div>
    )
}
export default ProfileStatusWithHooks;