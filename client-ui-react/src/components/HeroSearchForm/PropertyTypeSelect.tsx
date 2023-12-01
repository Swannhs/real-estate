import React, {FC, Fragment, useEffect, useState} from "react";
import {Popover, Transition} from "@headlessui/react";
import Checkbox from "../../shared/Checkbox/Checkbox";
import {StaticDataType} from "../../types";


export interface PropertyTypeSelectProps {
    lang: string;
    name?: string;
    textStyle?: string;
    description?: string;
    items: StaticDataType[];
    onChange: (data: any) => void;
    fieldClassName?: string;
    defaultValue?: string;
    itemInputFieldName?: string;
    children?: any;
}

const PropertyTypeSelect: FC<PropertyTypeSelectProps> = ({
        lang,
        name = '',
        textStyle = 'block xl:text-lg font-semibold overflow-hidden',
        onChange,
        fieldClassName = "[ nc-hero-field-padding ]",
        items,
        children,
    }) => {                                                     
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    useEffect(() => {
        if (onChange) {
            onChange(selectedItems);
        }
    }, [selectedItems]);

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setSelectedItems([...selectedItems, event.target.value]);
        } else {
            setSelectedItems(selectedItems.filter((item) => item !== event.target.value));
        }
    }

    return (
        <Popover className="flex relative flex-1">
            {({open}) => (
                <>
                    <Popover.Button
                        className={`flex text-left w-full flex-shrink-0 items-center ${fieldClassName} space-x-3 focus:outline-none cursor-pointer ${
                            open ? "nc-hero-field-focused" : ""
                        }`}
                        onClick={() => document.querySelector("html")?.click()}
                    >
                        <div className="text-neutral-300 dark:text-neutral-400">
                            {children}
                        </div>
                        <div className="flex-1">
                            <span className={textStyle}>
                                <span className="line-clamp-1">
                                    {name}
                                </span>
                            </span>
                        </div>
                    </Popover.Button>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                    >
                        <Popover.Panel
                            className="absolute left-0 z-10 w-full sm:min-w-[340px] max-w-sm bg-white dark:bg-neutral-800 top-full mt-3 py-5 sm:py-6 px-4 sm:px-8 rounded-3xl shadow-xl">
                            <div className="">
                                <div className="relative flex flex-col space-y-5">
                                    {
                                        items?.map((item: any, index: number) => (
                                            <div key={index} className="">
                                                <Checkbox
                                                    name={item.keyword}
                                                    label={item["description"+lang]}
                                                    value={item.keyword}
                                                    defaultChecked={selectedItems.includes(item.keyword)}
                                                    onChange={onChangeHandler}
                                                />
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </Popover.Panel>
                    </Transition>
                </>
            )}
        </Popover>
    );
};

export default PropertyTypeSelect;
