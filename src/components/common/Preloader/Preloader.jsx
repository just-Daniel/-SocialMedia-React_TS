import React from 'react'
import styles from './Preloader.module.css';

const Preloader = () => {
    console.log('style: ', styles);
    return <div class={ styles.ldsRoller }><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
};

export default Preloader;