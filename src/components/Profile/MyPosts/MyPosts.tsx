import React, {useRef} from "react";
import s from './MyPosts.module.css'
import Post from "./Post/Post";
import {addPostActionCreator, onPostChangeActionCreator} from "../../../redux/profile-reducer";
import {ActionsTypes, PostsType} from "../../../redux/State";

type MyPostsType = {
    posts: Array<PostsType>
    newPostText: string
    dispatch: (action:ActionsTypes)=>void
    // addPost:()=>void
    // updateNewPostText:(newText: string)=>void

}



const MyPosts = (props: MyPostsType) => {

    let postsElements =
        props.posts.map(p => <Post id={p.id} message={p.message} likesCount={p.likesCount}/>)

    let newPostElement = useRef<HTMLTextAreaElement>(null);

    let addPost = () => {
        if (newPostElement.current !== null) {
            props.dispatch(addPostActionCreator());
        }
    }

    let onPostChange = () => {
        if (newPostElement.current) {
            // props.dispatch(newPostElement.current.value)
            let text = newPostElement.current.value;
            // let action = {type:'UPDATE-NEW-POST-TEXT',newText:text}
            let action = onPostChangeActionCreator(text)
            props.dispatch(action);
        }


    }


    return (
        <div className={s.postsBlock}>
            <h3>My post</h3>
            <div>
                <textarea ref={newPostElement}
                          value={props.newPostText}
                          onChange={onPostChange}/>
            </div>
            <div>
                <button onClick={addPost}>Add</button>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
}

export default MyPosts