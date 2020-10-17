import React from 'react';
import style from './style.module.css'
import * as axios from 'axios';
import userPhoto from '../../assets/user2.png'

const Users = (props) => {
    let getUsers = () => {
    if (props.users.length === 0) {

        axios.get('https://social-network.samuraijs.com/api/1.0/users')
            .then(res => props.setUsers(res.data.items))

        // props.setUsers(
        //     [
        //         {id: 0, photoUrl: 'https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2013/7/17/1374074739277/Elon-Musk-001.jpg?width=700&quality=85&auto=format&fit=max&s=79f4f7b8c688b57c8082eb4cc45d653a', followed: false, fullName: 'Daniel', status: 'I am a boss', location: {city: 'Minsk', country: 'Belarus'} },
        //         {id: 1, photoUrl: 'https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2013/7/17/1374074739277/Elon-Musk-001.jpg?width=700&quality=85&auto=format&fit=max&s=79f4f7b8c688b57c8082eb4cc45d653a', followed: true, fullName: 'Sasha', status: 'I am a boss too', location: {city: 'Moscow', country: 'Russia'} },
        //         {id: 2, photoUrl: 'https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2013/7/17/1374074739277/Elon-Musk-001.jpg?width=700&quality=85&auto=format&fit=max&s=79f4f7b8c688b57c8082eb4cc45d653a', followed: false, fullName: 'Andrew', status: 'I am a boss too', location: {city: 'Kiev', country: 'Ukraine'} },
        //     ]
        // )
    }
    }   
    return (
        <div>
            <button onClick={ getUsers }>Show page</button>
            {
                props.users.map(u => <div key={ u.id }>
                    <span>
                    <div>
                        <img src={u.photos.small ? u.photos.small : userPhoto} className={style.userPhoto} alt='man'/>
                    </div>
                    <div>
                        {
                            u.followed 
                            ? <button onClick={ ()=> {
                                props.unfollow(u.id)
                              }}>Unfollow</button>
                            : <button onClick={ ()=> {
                                props.follow(u.id)
                              }}>Follow</button>
                        }
                    </div>
                </span>
                <span>
                    <span>
                        <div>{ u.fullName }</div>
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
};

export default Users;