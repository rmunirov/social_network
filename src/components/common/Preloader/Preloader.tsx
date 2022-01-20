import React, { FC } from 'react';
import preloaderImage from '../../../assets/image/preloader.svg';

const Preloader: FC = () => {
    return (
        <div>
            <img src={preloaderImage} alt={'Preloader'} />
        </div>
    );
};

export default Preloader;
