import React, { useState } from 'react';
import styles from './Pagination.module.css';
import cn from 'classnames';

type PropsType = {
    totalUsersCount: number
    pageSize: number 
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    portionSize?: number
}

export const Pagination: React.FC<PropsType> = ({totalUsersCount, pageSize, currentPage, onPageChanged, portionSize = 20}) => {
    let pagesCount = Math.ceil(totalUsersCount / pageSize / 50);
    const pages: Array<number> = [];

    for (let i=1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / portionSize);
    const [currentPortionNumber, setCurrentPortionNumber] = useState<number>(1);
    let leftPortionPageNumber = (currentPortionNumber - 1) * portionSize;
    let rightPortionPageNumber = currentPortionNumber * portionSize;

    return (
        <div>
            {    currentPortionNumber > 1 &&
                <button 
                    /* disabled={currentPortionNumber === 1} */
                    onClick={()=> setCurrentPortionNumber(currentPortionNumber - 1)}
                >prev</button>
            }

            { 
                pages
                .filter(page => page >= leftPortionPageNumber && page <= rightPortionPageNumber)
                .map(p => {
                    return <span
                        key={p}
                        className={ cn({[styles.selectedPage]: currentPage === p}, styles.pageNumber) }
                        onClick={() => onPageChanged(p)}
                        style={{'cursor': 'pointer'}}
                    >{p}</span>
                }) 
            }
            {    portionCount > currentPortionNumber  &&
                <button 
                    /* disabled={portionCount === currentPortionNumber } */
                    onClick={()=> setCurrentPortionNumber(currentPortionNumber + 1)}
                >next</button>
            }
        </div> 
    )
}