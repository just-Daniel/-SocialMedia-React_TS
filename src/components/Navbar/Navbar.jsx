import React from 'react';
import s from './Navbar.module.css';
import { NavLink } from 'react-router-dom';

const Navbar = (props) => {
  let linkElement = props.state.sidebarLink
    .map(i =>  <NavLink to={ i.link } activeClassName={s.active} key={i.id}>{ i.name }</NavLink>);

  let infoElement = props.state.info.content.map(i =>  
    <div key={i.id}>
      <div className={s.contentImg}>
        <img src={i.img} alt="friend"/>
      </div>
      <div className={s.contentName}>
        { i.name }
      </div>  
    </div>
   )

    return (
       <nav className={s.nav}>
        <div className={s.sidebarLinks}>
          {linkElement}
        </div>

        <div className={s.info}>
          <div className={s.infoTitle}>
            {props.state.info.title.name}
          </div>
          <div className={s.infoContent}>
            { infoElement }
          </div>
        </div>
      </nav>
    )
}

export default Navbar;