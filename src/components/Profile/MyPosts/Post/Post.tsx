import React from "react";
import s from './Post.module.css'

const Post = (props:any) => {
    return (
        <div>
            <div className={s.item}>
                <img
                    src={'https://n1s2.hsmedia.ru/6a/46/ae/6a46aeed947a183d67d1bc48211151bf/480x496_0xac120003_4430520541578509619.jpg'}/>
                {props.message}
                <div><span>like {props.likesCount}</span></div>
            </div>
        </div>
    )
}

export default Post