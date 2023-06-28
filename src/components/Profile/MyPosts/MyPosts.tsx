import React from "react";
import s from './MyPosts.module.css'
import Post from "./Post/Post";

const MyPosts = (props:any) => {

    let posts = [
        {id: 1, message: 'hi how are you', likesCount:0},
        {id: 2, message: 'Its my first post', likesCount:23},
    ]

    let postsElements=posts.map(p=><Post message={p.message} likesCount={p.likesCount}/>)
    return (
        <div className={s.postsBlock}>
            <h3>My post</h3>
            <div>
                <textarea></textarea>
            </div>
            <div>
                <button>Add</button>
            </div>
            <div className={s.posts} >
                {postsElements}
            </div>
        </div>
    )
}

export default MyPosts