import React from "react";
import styles from "./users.module.css";
import userPhoto from "../../assets/images/user.png";
import {UsersType} from "../../redux/users-reducer";
import {NavLink} from "react-router-dom";

export type UsersPageType = {
    users: Array<UsersType>,
    follow: (isFetching: boolean, userId: number) => void,
    unfollow: (isFetching: boolean, userId: number) => void,
    pageSize: number,
    totalUsersCount: number,
    currentPage: number
    onPageChanged: (page: number) => void
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
                                props.unfollow( false,u.id)


                            }}>Unfollow</button>
                            : <button disabled={props.isFollowingInProgress.some(id => id === u.id)} onClick={() => {
                                props.follow(true, u.id)

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