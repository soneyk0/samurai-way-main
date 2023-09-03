import React from "react";
import {UsersType} from "../../redux/users-reducer";
import styles from "./users.module.css";
import axios from 'axios';
import userPhoto from '../../assets/images/user.png'

export type UsersPageType = {
    users: Array<UsersType>,
    follow: (userId: number) => void,
    unfollow: (userId: number) => void,
    setUsers: (users: Array<UsersType>) => void
}

class Users extends React.Component <UsersPageType> {

    constructor(props:UsersPageType) {
        super(props);
        axios.get('https://social-network.samuraijs.com/api/1.0/users')
            .then(response => {
                this.props.setUsers(response.data.items)
            });
    }


    render() {
        return <div>
            {
                this.props.users.map(u => <div key={u.id}>
                <span>
                    <div>
                        <img src={u.photos.small ? u.photos.small : userPhoto} className={styles.userPhoto}/>
                    </div>
                    <div>
                        {u.followed
                            ? <button onClick={() => {
                                this.props.unfollow(u.id)
                            }}>Unfollow</button>
                            : <button onClick={() => {
                                this.props.follow(u.id)
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

}

export default Users