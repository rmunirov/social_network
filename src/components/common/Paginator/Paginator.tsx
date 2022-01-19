import React, { FC, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Paginator.module.scss';

const cn = classNames.bind(styles);
const CLASS_NAME = 'Paginator';

type NavButtonProps = {
    name: string;
    action: () => void;
};

const NavButton: FC<NavButtonProps> = ({ name, action }) => {
    return <button onClick={action}>{name}</button>;
};

type PageProps = {
    page: number;
    currentPage: number;
    onPageChanged: (page: number) => void;
};

const Page: FC<PageProps> = ({ page, currentPage, onPageChanged }) => {
    return (
        <span
            key={page.toString()}
            className={cn(CLASS_NAME, { [`${CLASS_NAME}__activePage`]: page === currentPage })}
            onClick={() => {
                onPageChanged(page);
            }}
        >
            {page}
        </span>
    );
};

type PaginatorProps = {
    totalCount: number;
    pageSize: number;
    currentPage: number;
    portionSize: number;
    onPageChanged: () => void;
};

const Paginator: FC<PaginatorProps> = ({
    totalCount,
    pageSize,
    currentPage,
    onPageChanged,
    portionSize = 10,
}) => {
    const pagesCount = Math.ceil(totalCount / pageSize);

    const pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    const portionCount = Math.ceil(pagesCount / portionSize);
    const [currentPortion, setCurrentPortion] = useState(1);
    const leftPageNumber = (currentPortion - 1) * portionSize + 1;
    const rightPageNumber = currentPortion * portionSize;

    return (
        <div>
            {currentPortion !== 1 && (
                <NavButton
                    name={'FIRST'}
                    action={() => {
                        setCurrentPortion(1);
                    }}
                />
            )}
            {currentPortion > 1 && (
                <NavButton
                    name={'PREV'}
                    action={() => {
                        setCurrentPortion(currentPortion - 1);
                    }}
                />
            )}
            {pages
                .filter((page) => page >= leftPageNumber && page <= rightPageNumber)
                .map((page) => {
                    return (
                        <Page
                            key={page}
                            page={page}
                            currentPage={currentPage}
                            onPageChanged={onPageChanged}
                        />
                    );
                })}

            {currentPortion < portionCount && (
                <NavButton
                    name={'NEXT'}
                    action={() => {
                        setCurrentPortion(currentPortion + 1);
                    }}
                />
            )}

            {currentPortion !== portionCount && (
                <NavButton
                    name={'LAST'}
                    action={() => {
                        setCurrentPortion(portionCount);
                    }}
                />
            )}
        </div>
    );
};

export default Paginator;
