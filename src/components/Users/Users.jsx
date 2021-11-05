import React from 'react';
import style from './style.module.css'
import userPhoto from '../../assets/user.png'
import { NavLink } from 'react-router-dom';

export const Users = props => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize / 250);
    const pages = [];

    for (let i=1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return (
        <div className={style.container}>
            <div>
                { 
                    pages.map(p => {
                        return <span
                            key={p}
                            className={props.currentPage === p ? style.selectedPage : ''}
                            onClick={() => props.onPageChanged(p)}
                            style={{'cursor': 'pointer'}}
                        >{p}</span>
                    }) 
                }
            </div>
            {
                props.users.map(u => <div key={ u.id }>
                    <span>
                    <div>
                        <NavLink to={'/profile/' + u.id}>
                            <img src={u.photos.small != null ? u.photos.small : userPhoto} className={style.userPhoto} alt='man'/>
                        </NavLink>
                    </div>
                    <div>
                        {
                            u.followed 
                            ? <button disabled={props.followingInProgress.some(id => id === u.id)} className={`${style.btn_unfollow} ${style.btn}`} 
                                onClick={ ()=> { props.unfollowUsers(u.id)}}
                              >Unfollow</button>

                            : <button disabled={props.followingInProgress.some(id => id === u.id)} className={`${style.btn_follow} ${style.btn}`} 
                                onClick={ ()=> { props.followUsers(u.id)}}
                              >Follow</button>
                        }
                    </div>
                </span>
                <span>
                    <span>
                        <div>{ u.name }</div>
                        <div>{ u.status }</div>
                    </span>
                    <span>
                        <div>{ 'u.location.country' }</div>
                        <div>{ 'u.location.city' }</div>
                    </span>
                </span>
                </div>)
            }
        </div>
    )
}