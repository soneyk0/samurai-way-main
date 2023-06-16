import React from "react";
import s from './Profile.module.css';
import MyPosts from "./MyPosts/MyPosts";

const Profile = () => {
    return (<div className={s.content}>
            <div><img
                src="https://www.mirf.ru/wp-content/uploads/2022/02/1522977132_128_0_7374_4076_1920x0_80_0_0_04ec5fd1abe7f78c95e028c368cc1e7c.jpg"
                alt=""/></div>
            <div>ava+descrip</div>
            <MyPosts/>
        </div>
    )
};

export default Profile;