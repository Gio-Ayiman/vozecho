import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <div>
            <div className=" bg-black px-6 py-2 ">
                <div className="text-white text-center flex flex-col md:flex-row md:justify-center md:gap-x-1">
                    <div>
                        <span className='font-skylar'>Copyright (© 2023 BAKOAI - All rights reserved)  </span>
                    </div>
                    <span className='hidden md:block' >/</span>
                    <div>
                        <Link className='font-skylar transition-all duration-100 hover:text-primary underline' to="/about"> Conditions d'utilisation </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;