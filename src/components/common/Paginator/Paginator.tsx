import React from "react";
import styles from './Paginator.module.css'


export type UsersPageType = {
    pageSize: number,
    totalUsersCount: number,
    currentPage: number
    onPageChanged: (page: number) => void
}

let Paginator = ({totalUsersCount, pageSize, currentPage, onPageChanged}: UsersPageType) => {

    let pagesCount = Math.ceil(totalUsersCount / pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return <div>
        {pages.map(p => {
            return <span onClick={() => {
                onPageChanged(p);
            }} className={currentPage === p ? styles.selectedPage : ''}
            >{p + ' '}</span>

        })}
    </div>
}

export default Paginator