import React, { FC } from 'react';
import style from './style.module.css'
import userPhoto from '../../assets/user.png'
import { NavLink } from 'react-router-dom';
import { UserType } from '../../Types/types';

type PropsType = {
    user: UserType
    followingInProgress: Array<number>
    followUsers: (userId: number) => void
    unfollowUsers: (userId: number) => void
}

export const User: FC<PropsType> = ({ user, followingInProgress, followUsers, unfollowUsers }) => {
    return (
        
        <div>
            <span>
                <div>
                    <NavLink to={'/profile/' + user.id}>
                        <img src={user.photos.small != null ? user.photos.small : userPhoto} className={style.userPhoto} alt='man'/>
                    </NavLink>
                </div>
                <div>
                    {
                        user.followed 
                        ? <button disabled={followingInProgress.some(id => id === user.id)} className={`${style.btn_unfollow} ${style.btn}`} 
                            onClick={ ()=> { unfollowUsers(user.id) }}
                            >Unfollow</button>

                        : <button disabled={followingInProgress.some(id => id === user.id)} className={`${style.btn_follow} ${style.btn}`} 
                            onClick={ ()=> { followUsers(user.id) }}
                            >Follow</button>
                    }
                </div>
            </span>
            <span>
                <span>
                    <div>{ user.name }</div>
                    <div>{ user.status }</div>
                </span>
                <span>
                    <div>{ 'user.location.country' }</div>
                    <div>{ 'user.location.city' }</div>
                </span>
            </span>
        </div>
    )
}