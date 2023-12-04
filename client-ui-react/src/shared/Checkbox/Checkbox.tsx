import React, {FC} from "react";
import {InputProps} from "../Input/Input";

export interface CheckboxProps extends InputProps {
    label?: string;
    subLabel?: string;
    className?: string;
    name: string;
    labelClassName?: string;
    onChange?: (event: any) => void;
}

const Checkbox: FC<CheckboxProps> = ({
                                         subLabel = "",
                                         label = "",
                                         name,
                                         className = "",
                                         labelClassName = "ml-3.5 flex flex-col flex-1 justify-center",
                                         onChange,
                                         ...args
                                     }) => {
    return (
        <div className={`flex text-sm sm:text-base ${className}`}>
            <input
                id={name}
                name={name}
                type="checkbox"
                className="focus:ring-action-primary h-6 w-6 tablet:h-5 tablet:w-5 text-primary-500 border-primary rounded border-neutral-500 bg-white dark:bg-neutral-700  dark:checked:bg-primary-500 focus:ring-primary-500"
                {...args}
                onChange={(event) => onChange && onChange(event)}
            />
            {label && (
                <label
                    htmlFor={name}
                    className={labelClassName}
                >
                    <span className="text-neutral-900 dark:text-neutral-100 tablet:text-sm">
                        {label}
                    </span>
                    {subLabel && (
                        <p className="mt-1 text-neutral-500 dark:text-neutral-400 text-sm font-light">
                            {subLabel}
                        </p>
                    )}
                </label>
            )}
        </div>
    );
};

export default Checkbox;
