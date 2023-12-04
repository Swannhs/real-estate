import React, {FC, useState} from "react";
import ButtonPrimary from "../../shared/Button/ButtonPrimary";
import Input from "../../shared/Input/Input";
import CommonLayout from "./CommonLayout";
import {useDispatch, useSelector} from "react-redux";
import {PROPERTY} from "../../redux/actionTypes";
import {useParams} from "react-router-dom";

export interface PageAddListing5Props {
}

const PageAddListing5: FC<PageAddListing5Props> = () => {
    const dispatch = useDispatch();
    const property = useSelector((state: any) => state.property.addProperty);
    const [addProperty, setAddProperty] = useState(property);
    const [estateRules, setEstateRules] = useState(property.estateRules);
    const [estateAdditionalRules, setEstateAdditionalRules] = useState<string[]>(property.estateAdditionalRules);
    const [newTag, setNewTag] = useState("");
    const {id} = useParams<any>();

    const newTagChangeHandler = (event: any) => {
        setNewTag(event.target.value);
    }

    const addNewTagHandler = () => {
        if (newTag === "") {
            return;
        }
        let newTags: string[] = [...estateAdditionalRules];
        newTags.push(newTag);
        setNewTag("");
        setEstateAdditionalRules(newTags);
        setNewTagsExecute(newTags);
    }

    const removeTagHandler = (index: number) => {
        let newTags: string[] = [...estateAdditionalRules];
        newTags.splice(index, 1);
        setEstateAdditionalRules(newTags);
        setNewTagsExecute(newTags);
    }

    const setNewTagsExecute = (newTags: string[]) => {
        setAddProperty({
            ...addProperty,
            estateAdditionalRules: newTags
        });
    }

    const onChangeHandler = (event: any) => {
        setEstateRules({
            ...estateRules,
            [event.target.name]: event.target.value === 'allow'
        });
    }

    const onSubmitHandler = () => {
        addProperty.estateRules = estateRules
        dispatch({type: PROPERTY.INSERT_PROPERTY_ELEMENT, payload: addProperty});
    }

    const renderNoInclude = (text: string, index: number) => {
        return (
            <div key={index} className="flex items-center justify-between py-3">
                <span className="text-neutral-6000 dark:text-neutral-400 font-medium">
                    {text}
                </span>
                <i
                    onClick={() => removeTagHandler(index)}
                    className="text-2xl text-neutral-400 las la-times-circle hover:text-neutral-900 dark:hover:text-neutral-100 cursor-pointer"
                />
            </div>
        );
    };

    return (
        <CommonLayout
            index="05"
            nextHref={`${window.location.pathname.toString().split('/')[2] === 'edit' ? `/property/edit/6/${id}` : '/property/add/6'}`}
            backtHref={`${window.location.pathname.toString().split('/')[2] === 'edit' ? `/property/edit/4/${id}` : '/property/add/4'}`}
            onSubmit={onSubmitHandler}
        >
            <>
                <div>
                    <h2 className="text-2xl font-semibold">
                        Set house rules for your guests{" "}
                    </h2>
                    <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
                        Guests must agree to your house rules before they book.
                    </span>
                </div>
                <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
                {/* FORM */}
                <div className="space-y-8">

                    {/* ITEM */}
                    <div>
                        <label className="text-lg font-semibold" htmlFor="">
                            Pet
                        </label>
                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            <div className="flex items-center">
                                <input
                                    type='radio'
                                    name='isPetAllowed'
                                    value='deny'
                                    className="focus:ring-primary-500 h-6 w-6 text-primary-500 border-neutral-300 !checked:bg-primary-500 bg-transparent"
                                    checked={!estateRules.isPetAllowed}
                                    onChange={onChangeHandler}
                                />
                                <label
                                    htmlFor='isPetAllowed'
                                    className="ml-3 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                                >
                                    Do not allow
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type='radio'
                                    name='isPetAllowed'
                                    value='allow'
                                    className="focus:ring-primary-500 h-6 w-6 text-primary-500 border-neutral-300 !checked:bg-primary-500 bg-transparent"
                                    checked={estateRules.isPetAllowed}
                                    onChange={onChangeHandler}
                                />
                                <label
                                    htmlFor='isPetAllowed'
                                    className="ml-3 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                                >
                                    Allow
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* ITEM */}
                    <div>
                        <label className="text-lg font-semibold" htmlFor="">
                            Smoking
                        </label>
                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            <div className="flex items-center">
                                <input
                                    type='radio'
                                    name='isSmokingAllowed'
                                    value='deny'
                                    className="focus:ring-primary-500 h-6 w-6 text-primary-500 border-neutral-300 !checked:bg-primary-500 bg-transparent"
                                    checked={!estateRules.isSmokingAllowed}
                                    onChange={onChangeHandler}
                                />
                                <label
                                    htmlFor='isSmokingAllowed'
                                    className="ml-3 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                                >
                                    Do not allow
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type='radio'
                                    name='isSmokingAllowed'
                                    value='allow'
                                    className="focus:ring-primary-500 h-6 w-6 text-primary-500 border-neutral-300 !checked:bg-primary-500 bg-transparent"
                                    checked={estateRules.isSmokingAllowed}
                                    onChange={onChangeHandler}
                                />
                                <label
                                    htmlFor='isSmokingAllowed'
                                    className="ml-3 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                                >
                                    Allow
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* ITEM */}
                    <div>
                        <label className="text-lg font-semibold" htmlFor="">
                            General Amenities
                        </label>
                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            <div className="flex items-center">
                                <input
                                    type='radio'
                                    name='isGeneralAmenitiesAllowed'
                                    value='deny'
                                    className="focus:ring-primary-500 h-6 w-6 text-primary-500 border-neutral-300 !checked:bg-primary-500 bg-transparent"
                                    checked={!estateRules.isGeneralAmenitiesAllowed}
                                    onChange={onChangeHandler}
                                />
                                <label
                                    htmlFor='isGeneralAmenitiesAllowed'
                                    className="ml-3 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                                >
                                    Do not allow
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type='radio'
                                    name='isGeneralAmenitiesAllowed'
                                    value='allow'
                                    className="focus:ring-primary-500 h-6 w-6 text-primary-500 border-neutral-300 !checked:bg-primary-500 bg-transparent"
                                    checked={estateRules.isGeneralAmenitiesAllowed}
                                    onChange={onChangeHandler}
                                />
                                <label
                                    htmlFor='isGeneralAmenitiesAllowed'
                                    className="ml-3 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                                >
                                    Allow
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* ITEM */}
                    <div>
                        <label className="text-lg font-semibold" htmlFor="">
                            Party Organizing
                        </label>
                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            <div className="flex items-center">
                                <input
                                    type='radio'
                                    name='isPartyOrganizingAllowed'
                                    value='deny'
                                    className="focus:ring-primary-500 h-6 w-6 text-primary-500 border-neutral-300 !checked:bg-primary-500 bg-transparent"
                                    checked={!estateRules.isPartyOrganizingAllowed}
                                    onChange={onChangeHandler}
                                />
                                <label
                                    htmlFor='isPartyOrganizingAllowed'
                                    className="ml-3 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                                >
                                    Do not allow
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type='radio'
                                    name='isPartyOrganizingAllowed'
                                    value='allow'
                                    className="focus:ring-primary-500 h-6 w-6 text-primary-500 border-neutral-300 !checked:bg-primary-500 bg-transparent"
                                    checked={estateRules.isPartyOrganizingAllowed}
                                    onChange={onChangeHandler}
                                />
                                <label
                                    htmlFor='isPartyOrganizingAllowed'
                                    className="ml-3 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                                >
                                    Allow
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* ITEM */}
                    <div>
                        <label className="text-lg font-semibold" htmlFor="">
                            Cooking
                        </label>
                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            <div className="flex items-center">
                                <input
                                    type='radio'
                                    name='isCookingAllowed'
                                    value='deny'
                                    className="focus:ring-primary-500 h-6 w-6 text-primary-500 border-neutral-300 !checked:bg-primary-500 bg-transparent"
                                    checked={!estateRules.isCookingAllowed}
                                    onChange={onChangeHandler}
                                />
                                <label
                                    htmlFor='isCookingAllowed'
                                    className="ml-3 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                                >
                                    Do not allow
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type='radio'
                                    name='isCookingAllowed'
                                    value='allow'
                                    className="focus:ring-primary-500 h-6 w-6 text-primary-500 border-neutral-300 !checked:bg-primary-500 bg-transparent"
                                    checked={estateRules.isCookingAllowed}
                                    onChange={onChangeHandler}
                                />
                                <label
                                    htmlFor='isCookingAllowed'
                                    className="ml-3 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                                >
                                    Allow
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* ----------- Tag Section Start ------------------*/}
                    <div className=" border-b border-neutral-200 dark:border-neutral-700"></div>
                    <span className="block text-lg font-semibold">Additional rules</span>
                    <div className="flow-root">
                        <div className="-my-3 divide-y divide-neutral-100 dark:divide-neutral-800">
                            {
                                estateAdditionalRules?.map((tag: string, index: number) => {
                                    return renderNoInclude(tag, index);
                                })
                            }
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between space-y-3 sm:space-y-0 sm:space-x-5">
                        <Input className="!h-full" placeholder="Add new tag here" value={newTag}
                               onChange={newTagChangeHandler}/>
                        <ButtonPrimary className="flex-shrink-0" onClick={addNewTagHandler}>
                            <i className="text-xl las la-plus"></i>
                            <span className="ml-3">Add tag</span>
                        </ButtonPrimary>
                    </div>
                    {/* ----------- Tag Section End ------------------*/}
                </div>
            </>
        </CommonLayout>
    );
};

export default PageAddListing5;
