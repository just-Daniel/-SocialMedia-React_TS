import React from 'react';
import s from '../Dialogs.module.css';
import { NavLink } from 'react-router-dom';

const DialogItem = (props) => {
  const path = '/dialogs/' + props.id;

  return (
    <div className={s.item}>
      <img src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt=""/>
      <NavLink to={ path } activeClassName={s.active}>{ props.name }</NavLink>
    </div>
  )
}

export default DialogItem;