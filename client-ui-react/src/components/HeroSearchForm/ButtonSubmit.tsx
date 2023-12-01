import React, {FC} from "react";
import Button, {ButtonProps} from "../../shared/Button/Button";

interface ButtonSubmitProps extends ButtonProps {
    className?: string;
}

const ButtonSubmit: FC<ButtonSubmitProps> = ({className = '', ...args}) => {
    return (
        <Button
            className="h-14 md:h-16 w-full md:w-16 rounded-full bg-primary-6000 hover:bg-primary-700 flex items-center justify-center text-neutral-50 focus:outline-none"
            {...args}
        >
            <span className="mr-3 md:hidden">Search</span>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3.5}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
            </svg>
        </Button>
    );
};

export default ButtonSubmit;
