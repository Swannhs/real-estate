"use client";

import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {countDecrement, countIncrement} from "@/redux/slices/counter";
import {selectEstateAdvertisers} from "@/redux/slices/estate-advertiser";

const SearchComponent = () => {
    const dispatch = useDispatch();
    const counter = useSelector((state: any) => state.counter);
    const estateAdvertisers = useSelector(selectEstateAdvertisers);

    console.log(estateAdvertisers)

    const onIncrement = () => {
        dispatch(countIncrement());
    }

    const onDecrement = () => {
        dispatch(countDecrement());
    }

    return (
        <div>
            <h1>Testing {counter.value}</h1>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={onIncrement}
            >
                Increment
            </button>
            <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={onDecrement}
            >
                Decrement
            </button>
        </div>
    );
};

export default SearchComponent;