import React, {useEffect} from "react";
import s from './MyPosts.module.css'
import Post from "./Post/Post";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormsControls/FormsControls";
import {PostModel, ProfileModel, setPostsActionCreator} from "../../../redux/profile-reducer";
import {useDispatch} from "react-redux";
import post from "./Post/Post";

type MyPostsType = {
    posts: PostModel[]
    addPost: (newPostText: string) => void
    profile: ProfileModel
}

type FormDataType = {
    newPostText: string,
}


const MyPosts = React.memo((props: MyPostsType) => {

    const dispatch = useDispatch()

    useEffect(() => {
        const savedPosts = localStorage.getItem("posts");
        if (savedPosts) {
            const parsedPosts: PostModel[] = JSON.parse(savedPosts);
            console.log(parsedPosts)
            dispatch(setPostsActionCreator(parsedPosts));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("posts", JSON.stringify(props.posts));
    }, [props.posts]);

    const handleDeletePost = (postId:string) => {
        const posts = JSON.parse(localStorage.getItem("posts") ??'[]');
        const updatedPosts = posts.filter((post:PostModel) => post.id !== postId);
        localStorage.setItem("posts", JSON.stringify(updatedPosts));
    }

    const handleDeletePost1 = (postId:string) => {
        // удаление поста по его id
        const updatedPosts = props.posts.filter(post => post.id !== postId);

        // обновление данных в localStorage
        localStorage.setItem("posts", JSON.stringify(updatedPosts));
    };

    let postsElements =
        props.posts.map(p => <div><Post key={p.id} id={p.id} message={p.message} profile={props.profile}/>
        </div>)

    let onAddPost = (values: FormDataType) => {
        props.addPost(values.newPostText)
    }

    return (
        <div className={s.postsBlock}>
            <h3>My post</h3>
            <AddNewPostFormRedux onSubmit={onAddPost}/>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
})

const maxLength10 = maxLengthCreator(10)

let AddNewPostForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={'newPostText'} component={Textarea} validate={[required, maxLength10]}
                       placeholder={'Post message'}/>
            </div>
            <div>
                <button>Add</button>
            </div>
        </form>
    )
}

const AddNewPostFormRedux = reduxForm<FormDataType>({form: 'ProfileAddNewPostForm'})(AddNewPostForm)

export default MyPosts