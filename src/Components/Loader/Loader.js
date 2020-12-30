import React from 'react';
import Load from '../../Images/Load.gif';

const Loader = () => {
    return (
        <div className="loader">
            <img src={Load} alt='Loading...'/>
        </div>
    );
}

export default Loader;
