import React from "react";
import styles from "./users.module.css";
import userPhoto from "../../assets/images/user.png";
import {UsersType} from "../../redux/users-reducer";
import {NavLink} from "react-router-dom";

export type UsersPageType = {
    user: UsersType,
    follow: (isFetching: boolean, userId: number) => void,
    unfollow: (isFetching: boolean, userId: number) => void,
    isFollowingInProgress: Array<number>
}

let User = ({user, isFollowingInProgress, unfollow,follow}: UsersPageType) => {
    return (
        <div>
                <span>
                    <div>
                        <NavLink to={'/profile/' + user.id}>
                            <img src={user.photos.small ? user.photos.small : userPhoto} className={styles.userPhoto}
                                 alt={'user'}/>
                        </NavLink>

                    </div>
                    <div>
                        {user.followed
                            ? <button disabled={isFollowingInProgress.some(id => id === user.id)} onClick={() => {
                                unfollow(false, user.id)


                            }}>Unfollow</button>
                            : <button disabled={isFollowingInProgress.some(id => id === user.id)} onClick={() => {
                                follow(true, user.id)

                            }}>Follow</button>}
                    </div>
                </span>
            <span>
                    <span>
                        <div>{user.name}</div>
                        <div>{user.status}</div>
                    </span>
                    <span>
                        <div>{'u.location.country'}</div>
                        <div>{'u.location.city'}</div>
                    </span>
                </span>
        </div>)
}

export default User