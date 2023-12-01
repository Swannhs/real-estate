import React from "react";
import {Link} from "react-router-dom";
import {useAuth} from "../../hooks/contextApi/AuthContext";

export interface LogoProps {
    img?: string;
    imgLight?: string;
    className?: string;
}

const Logo: React.FC<LogoProps> = () => {
    const {isAuthenticated} = useAuth();

    return (
        <Link
            to="/"
            className={`ttnc-logo inline-block text-black dark:text-white w-fit`}
        >
            {/*<LogoSvgLight/>*/}
            {/*<LogoSvg/>*/}
            <h1 className='lg:text-2xl md:text-2xl border-l-4 border-green-600 pl-2 tracking-wider'
                style={{fontFamily: 'sans-serif'}}>
                <span className='tablet:hidden' style={{fontWeight: 600}}>FortunatisHomes</span>
                <span className='hidden tablet:block' style={{fontWeight: 600}} title='FortunatisHomes'>
                    {isAuthenticated ? "Fortunatis" : "FH"}
                </span>
            </h1>

            {/* THIS USE FOR MY CLIENT */}
            {/* PLEASE UN COMMENT BELLOW CODE AND USE IT */}
            {/* {img ? (
        <img
          className={`block max-h-12 ${imgLight ? "dark:hidden" : ""}`}
          src={img}
          alt="Logo"
        />
      ) : (
        "Logo Here"
      )}
      {imgLight && (
        <img
          className="hidden max-h-12 dark:block"
          src={imgLight}
          alt="Logo-Light"
        />
      )} */}
        </Link>
    );
};

export default Logo;
