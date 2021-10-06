import styles from "./Paginator.module.css";
import React, {useState} from "react";

const NavButton = ({name, action}) => {
    return (
        <button onClick={action}>
            {name}
        </button>
    );
}

const Page = ({page, currentPage, onPageChanged}) => {
    return (
        <span key={page.toString()}
              className={page === currentPage ? styles.active_page : ''}
              onClick={() => {
                  onPageChanged(page)
              }}>
            {page}
        </span>
    )
}

const Paginator = ({totalCount, pageSize, currentPage, onPageChanged, portionSize = 10}) => {
    const pagesCount = Math.ceil(totalCount / pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    const portionCount = Math.ceil(pagesCount / portionSize);
    const [currentPortion, setCurrentPortion] = useState(1);
    const leftPageNumber = (currentPortion - 1) * portionSize + 1;
    const rightPageNumber = currentPortion * portionSize;

    return (
        <div>
            {
                currentPortion !== 1 && <NavButton name={"FIRST"} action={() => {
                    setCurrentPortion(1)
                }}/>
            }
            {
                currentPortion > 1 && <NavButton name={"PREV"} action={() => {
                    setCurrentPortion(currentPortion - 1)
                }}/>
            }
            {
                pages.filter(page => page >= leftPageNumber && page <= rightPageNumber).map((page) => {
                    return (<Page key={page} page={page} currentPage={currentPage} onPageChanged={onPageChanged}/>)
                })
            }

            {
                currentPortion < portionCount && <NavButton name={"NEXT"} action={() => {
                    setCurrentPortion(currentPortion + 1)
                }}/>
            }

            {
                currentPortion !== portionCount && <NavButton name={"LAST"} action={() => {
                    setCurrentPortion(portionCount)
                }}/>
            }
        </div>
    )
}

export default Paginator;
