import React from 'react';
import Button, {ButtonProps} from "./Button";

export interface ButtonPublishProps extends ButtonProps {

}

const ButtonPublish: React.FC<ButtonPublishProps> = ({className = "", ...args}) => {
    return (
        <Button
            className={`py-3 px-4 inline-flex justify-center items-center gap-2 rounded-3xl border border-transparent font-semibold bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800 ${className}`}
            {...args}
        />
    );
};

export default ButtonPublish;
