import React from 'react';
import s from '../Dialogs.module.css';
import { NavLink } from 'react-router-dom';

const DialogItem = (props) => {
  const path = '/dialogs/' + props.id;

  return (
    <div className={s.item}>
      <img src="https://lh3.googleusercontent.com/proxy/3uiyVU21e2bkeDXQX9peU24xiYqe4gmnb5HHpsCSHHiDN4i1hSmMoyxwDNNksxMx_hpWpc_d1ZU1MVMFgNqqEafbnKRHwqj6Trbv9X66oj88sg9orVQ4_v9uoPrsvCpXftk_ObJkhQPxnoCuqhd6eo9uwJ_mk5MKsHSSRh0NIfvyDKrZgcEtXZc" alt=""/>
      <NavLink to={ path }>{ props.name }</NavLink>
    </div>
  )
}

export default DialogItem;