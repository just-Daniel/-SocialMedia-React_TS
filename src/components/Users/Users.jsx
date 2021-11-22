import React from 'react';
import style from './style.module.css'
import { Pagination } from '../common/Pagination/Pagination';
import { User } from './User';

export const Users = ({totalUsersCount, pageSize, currentPage, onPageChanged, users, ...props}) => {
    return (
        <div className={style.container}>
            <Pagination totalUsersCount={totalUsersCount} pageSize={pageSize}
                currentPage={currentPage} onPageChanged={onPageChanged}
            />
            <div>
            {
                users.map(u => <User key={u.id}
                    user={u} followingInProgress={props.followingInProgress}
                    followUsers={props.followUsers} unfollowUsers={props.unfollowUsers}
                    />
                )
            }
            </div>
        </div>
    )
}