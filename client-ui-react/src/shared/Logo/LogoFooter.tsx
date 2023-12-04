import React from "react";
import {Link} from "react-router-dom";

export interface LogoProps {
    img?: string;
    imgLight?: string;
    className?: string;
}

const Logo: React.FC<LogoProps> = () => {
    return (
        <Link
            to="/"
            className={`ttnc-logo inline-block text-black dark:text-white w-fit`}
        >
            <h1 className='lg:text-2xl md:text-2xl border-l-4 border-green-600 pl-2 tracking-wider'
                style={{fontFamily: 'sans-serif'}}>
                <span style={{fontWeight: 600}}>FortunatisHomes</span>
            </h1>
        </Link>
    );
};

export default Logo;
