import {SearchIcon} from "@heroicons/react/outline";
import React, {FC, useEffect, useRef, useState} from "react";

interface Props {
    onClick?: () => void;
    onChange?: (value: string) => void;
    className?: string;
    defaultValue?: string;
    headingText?: string;
}

const LocationInput: FC<Props> = ({
                                      onChange,
                                      className = "",
                                      defaultValue = "",
                                  }) => {
    const [value, setValue] = useState("");
    const containerRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        setValue(defaultValue);
    }, [defaultValue]);

    return (
        <div className={`${className}`} ref={containerRef}>
            <div className="p-5">
                <div className="relative mt-5">
                    <input
                        className={`block w-full bg-transparent border px-4 py-3 pr-12 border-neutral-900 dark:border-neutral-200 rounded-xl focus:ring-0 focus:outline-none text-base leading-none placeholder-neutral-500 dark:placeholder-neutral-300 truncate font-bold placeholder:truncate`}
                        placeholder={"Search Location"}
                        value={value}
                        onChange={(e) => {
                            onChange && onChange(e.target.value);
                            setValue(e.currentTarget.value);
                        }}
                        ref={inputRef}
                    />
                    <span className="absolute right-2.5 top-1/2 -translate-y-1/2">
            <SearchIcon className="w-5 h-5 text-neutral-700 dark:text-neutral-400"/>
          </span>
                </div>
            </div>
        </div>
    );
};

export default LocationInput;
