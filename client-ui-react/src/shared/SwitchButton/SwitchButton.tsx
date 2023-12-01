import React, {FC, useEffect, useState} from 'react';

interface SwitchButtonProps {
    isActive: boolean;
    onChange: (isActive: boolean) => void;
}

const SwitchButton: FC<SwitchButtonProps> = ({isActive: active, onChange}) => {
    const [isActive, setIsActive] = useState<boolean>(false);

    useEffect(() => {
        setIsActive(active);
    }, [active]);

    const toggleSwitch = () => {
        onChange(!isActive);
        setIsActive(!isActive);
    };

    return (
        <div className="flex items-center">
            <button
                onClick={toggleSwitch}
                className={`${
                    isActive ? 'bg-green-500' : 'bg-gray-300'
                } relative inline-flex flex-shrink-0 h-6 w-12 border-2 border-transparent rounded-full cursor-pointer transition-colors focus:outline-none`}
            >
                <span
                    className={`${
                        isActive ? 'translate-x-6' : 'translate-x-0'
                    } inline-block h-5 w-5 rounded-full bg-white shadow-md transform transition-transform ease-in-out duration-300`}
                />
            </button>
        </div>
    );
};

export default SwitchButton;