import React, { memo, useEffect, useState } from 'react';
import classnames from 'classnames/bind';
import { useWindowSize } from '../hooks/useWindowSize';
import { Breakpoints } from '../constants/breakpoints';
import styles from './AppLayout.module.scss';

const cn = classnames.bind(styles);
const CLASS_NAME = 'AppLayout';

export const AppLayout = memo(({ children }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const windowSize = useWindowSize();

    useEffect(() => {
        if (window.innerWidth < Breakpoints.tabletBig) {
            setIsCollapsed(true);
        } else {
            setIsCollapsed(false);
        }
    }, [windowSize.width]);

    return (
        <div className={cn(CLASS_NAME, { [`${CLASS_NAME}--isCollapsed`]: isCollapsed })}>
            <div>sidebar</div>
            <div>topbar</div>
            <div>
                container
                <div>tags</div>
                <div>{children}</div>
            </div>
        </div>
    );
});

AppLayout.displayName = 'AppLayout';
