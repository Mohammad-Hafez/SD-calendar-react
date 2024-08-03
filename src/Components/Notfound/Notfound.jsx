import React from 'react';
import err404 from '../../Assets/404.svg'
const Notfound = () => {

    return (
        <section className='flex align-center justify-center h-full'>
            <img src={err404} className='w-2/4 object-contain' alt="404 not found image" />
        </section>
    );
};

export default Notfound;
