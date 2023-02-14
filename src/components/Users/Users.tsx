import React from 'react';
import style from './style.module.css'
import { Pagination } from '../common/Pagination/Pagination';
import { User } from './User';
import { UserType } from '../../Types/types';

type PropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    users: Array<UserType>
    followingInProgress: Array<number>
    onPageChanged: (pageNumber: number) => void
    followUsers: (userId: number) => void
    unfollowUsers: (userId: number) => void
}

export const Users: React.FC<PropsType> = ({totalUsersCount, pageSize, currentPage, onPageChanged, users, ...props}) => {
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