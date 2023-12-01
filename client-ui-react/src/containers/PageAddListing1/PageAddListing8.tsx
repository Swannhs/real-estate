import React, {FC, useState} from "react";
import Input from "../../shared/Input/Input";
import Select from "../../shared/Select/Select";
import CommonLayout from "./CommonLayout";
import FormItem from "./FormItem";
import {useDispatch, useSelector} from "react-redux";
import {PROPERTY} from "../../redux/actionTypes";
import {useParams} from "react-router-dom";

export interface PageAddListing8Props {
}

const PageAddListing8: FC<PageAddListing8Props> = () => {
    const dispatch = useDispatch();
    const property = useSelector((state: any) => state.property.addProperty);
    const [addProperty, setAddProperty] = useState(property);
    const {id} = useParams<any>();

    const onChangeHandler = (event: any) => {
        setAddProperty({
                ...addProperty,
                [event.target.name]: event.target.value
            }
        );
    }

    const onSubmitHandler = () => {
        dispatch({type: PROPERTY.INSERT_PROPERTY_ELEMENT, payload: addProperty});
    }

    return (
        <CommonLayout
            index="08"
            nextHref={`${window.location.pathname.toString().split('/')[2] === 'edit' ? `/property/edit/9/${id}` : '/property/add/9'}`}
            backtHref={`${window.location.pathname.toString().split('/')[2] === 'edit' ? `/property/edit/7/${id}` : '/property/add/7'}`}
            onSubmit={onSubmitHandler}
        >
            <>
                <div>
                    <h2 className="text-2xl font-semibold">Price your space</h2>
                    <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
                        The host's revenue is directly dependent on the setting of rates and
                        regulations on the number of guests, the number of nights, and the
                        cancellation policy.
                    </span>
                </div>
                <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
                {/* FORM */}
                <div className="space-y-8">
                    {/* ITEM */}
                    <FormItem label="Currency">
                        <Select name='currency' value={addProperty.currency === '' ? 'SELECT' : addProperty.currency}
                                onChange={onChangeHandler}>
                            <option disabled={true} value="SELECT">Select currency</option>
                            <option value="USD">USD</option>
                            <option value="VND">VND</option>
                            <option value="EURRO">EURRO</option>
                        </Select>
                    </FormItem>
                    <FormItem label="Price Per Square Fit">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="text-gray-500">$</span>
                            </div>
                            <Input name='pricePerSquareFit' value={addProperty.pricePerSquareFit}
                                   onChange={onChangeHandler} className="!pl-8 !pr-10" placeholder="0.00"
                                   type='number'/>
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <span className="text-gray-500">USD</span>
                            </div>
                        </div>
                    </FormItem>
                    {/* ----- */}
                    <FormItem label="Long term price (Monthly discount) ">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="text-gray-500">%</span>
                            </div>
                            <Input name='discount' value={addProperty.discount} onChange={onChangeHandler}
                                   className="!pl-8 !pr-10" placeholder="0.00" type='number'/>
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <span className="text-gray-500">every month</span>
                            </div>
                        </div>
                    </FormItem>
                </div>
            </>
        </CommonLayout>
    );
};

export default PageAddListing8;
