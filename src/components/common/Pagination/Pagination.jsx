import React from 'react';
import style from './Pagination.module.css'

export const Pagination = ({totalUsersCount, pageSize, currentPage, onPageChanged}) => {
    let pagesCount = Math.ceil(totalUsersCount / pageSize / 250);
    const pages = [];

    for (let i=1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return (
        <div>
            { 
                pages.map(p => {
                    return <span
                        key={p}
                        className={currentPage === p ? style.selectedPage : ''}
                        onClick={() => onPageChanged(p)}
                        style={{'cursor': 'pointer'}}
                    >{p}</span>
                }) 
            }
        </div> 
    )
}