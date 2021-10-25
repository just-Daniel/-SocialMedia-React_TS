import React from 'react';
import style from './style.module.css'
import userPhoto from '../../assets/user.png'

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
                            className={props.currentPage === p && style.selectedPage}
                            onClick={() => props.onPageChanged(p)}
                        >{p}</span>
                    }) 
                }
            </div>
            {
                props.users.map(u => <div key={ u.id }>
                    <span>
                    <div>
                        <img src={u.photos.small != null ? u.photos.small : userPhoto} className={style.userPhoto} alt='man'/>
                    </div>
                    <div>
                        {
                            u.followed 
                            ? <button className={`${style.btn_unfollow} ${style.btn}`} onClick={ ()=> {
                                props.unfollow(u.id)
                            }}>Unfollow</button>
                            : <button className={`${style.btn_follow} ${style.btn}`} onClick={ ()=> {
                                props.follow(u.id)
                            }}>Follow</button>
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