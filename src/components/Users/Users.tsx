import React from "react";
import styles from "./users.module.css";
import userPhoto from "../../assets/images/user.png";
import {UsersType} from "../../redux/users-reducer";
import {NavLink} from "react-router-dom";
import axios from "axios";

export type UsersPageType = {
    users: Array<UsersType>,
    follow: (userId: number) => void,
    unfollow: (userId: number) => void,
    pageSize: number,
    totalUsersCount: number,
    currentPage: number
    onPageChanged: (page: number) => void
    toggleIsFollowingProgress: (isFetching:boolean, userId:number) => void
    isFollowingInProgress: Array<number>
}

let Users = (props: UsersPageType) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return <div>
        <div>
            {pages.map(p => {
                return <span onClick={() => {
                    props.onPageChanged(p);
                }} className={props.currentPage === p ? styles.selectedPage : ''}
                >{p + ' '}</span>

            })}
        </div>
        {
            props.users.map(u => <div key={u.id}>
                <span>
                    <div>
                        <NavLink to={'/profile/' + u.id}>
                            <img src={u.photos.small ? u.photos.small : userPhoto} className={styles.userPhoto}
                                 alt={'user'}/>
                        </NavLink>

                    </div>
                    <div>
                        {u.followed
                            ? <button disabled={props.isFollowingInProgress.some(id => id === u.id)} onClick={() => {
                                props.toggleIsFollowingProgress(true,u.id)
                                axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {
                                    withCredentials: true,
                                    headers: {
                                        'API-KEY': '00f29180-c35c-415a-9fc9-4d442e2940fa'
                                    }
                                })
                                    .then(response => {
                                        if (response.data.resultCode === 0) {
                                            props.unfollow(u.id);
                                        }
                                        props.toggleIsFollowingProgress(false,u.id)
                                    });

                            }}>Unfollow</button>
                            : <button disabled={props.isFollowingInProgress.some(id => id === u.id)} onClick={() => {
                                props.toggleIsFollowingProgress(true,u.id)
                                axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {}, {
                                    withCredentials: true,
                                    headers: {
                                        'API-KEY': '00f29180-c35c-415a-9fc9-4d442e2940fa'
                                    }
                                })
                                    .then(response => {
                                        if (response.data.resultCode === 0) {
                                            props.follow(u.id)
                                        }
                                        props.toggleIsFollowingProgress(false,u.id)
                                    });
                            }}>Follow</button>}
                    </div>
                </span>
                <span>
                    <span>
                        <div>{u.name}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{'u.location.country'}</div>
                        <div>{'u.location.city'}</div>
                    </span>
                </span>
            </div>)
        }
    </div>
}

export default Users