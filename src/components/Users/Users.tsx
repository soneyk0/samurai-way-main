import React from "react";
import {UsersType} from "../../redux/users-reducer";
import styles from "./users.module.css";
import axios  from 'axios';
import userPhoto from '../../assets/images/user.png'

export type UsersPageType = {
    users: Array<UsersType>,
    follow: (userId: number) => void,
    unfollow: (userId: number) => void,
    setUsers: (users: Array<UsersType>) => void
}
const Users = (props: UsersPageType) => {

    let getUsers = () => {
        if (props.users.length === 0) {

            axios.get('https://social-network.samuraijs.com/api/1.0/users').then(function (response) {

                props.setUsers(response.data.items)
            });
        }


        // props.setUsers([
        //     {
        //         id: 1,
        //         photoUrl: 'https://img01.rl0.ru/afisha/e375x210p0x32f5760x3291q85i/s3.afisha.ru/mediastorage/87/27/5fd2432fb42640fd99f0e9fb2787.jpg',
        //         followed: false,
        //         fullName: 'Dmitry',
        //         status: 'Im a boss',
        //         location: {city: 'Minsk', country: 'Belarus'}
        //     },
        //     {
        //         id: 2,
        //         photoUrl: 'https://img01.rl0.ru/afisha/e375x210p0x32f5760x3291q85i/s3.afisha.ru/mediastorage/87/27/5fd2432fb42640fd99f0e9fb2787.jpg',
        //         followed: true,
        //         fullName: 'Alina',
        //         status: 'Im a boss too',
        //         location: {city: 'Warsaw', country: 'Poland'}
        //     },
        //     {
        //         id: 3,
        //         photoUrl: 'https://img01.rl0.ru/afisha/e375x210p0x32f5760x3291q85i/s3.afisha.ru/mediastorage/87/27/5fd2432fb42640fd99f0e9fb2787.jpg',
        //         followed: false,
        //         fullName: 'Andrew',
        //         status: 'I love beer',
        //         location: {city: 'Berlin', country: 'Germany'}
        //     },
        // ])
    }

    return <div>
        <button onClick={getUsers}>Get Users</button>
        {
            props.users.map(u => <div key={u.id}>
                <span>
                    <div>
                        <img src={u.photos.small ? u.photos.small : userPhoto} className={styles.userPhoto}/>
                    </div>
                    <div>
                        {u.followed
                            ? <button onClick={() => {
                                props.unfollow(u.id)
                            }}>Unfollow</button>
                            : <button onClick={() => {
                                props.follow(u.id)
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