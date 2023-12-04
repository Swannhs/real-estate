import React, {FC, useState} from "react";
import Textarea from "../../shared/Textarea/Textarea";
import CommonLayout from "./CommonLayout";
import {useDispatch, useSelector} from "react-redux";
import {PROPERTY} from "../../redux/actionTypes";
import Input from "../../shared/Input/Input";
import {useParams} from "react-router-dom";

export interface PageAddListing6Props {
}

const PageAddListing6: FC<PageAddListing6Props> = () => {
    const dispatch = useDispatch();
    const property = useSelector((state: any) => state.property.addProperty);
    const [addProperty, setAddProperty] = useState(property);
    const {id} = useParams<any>();

    const onChangeHandler = (event: any) => {
        setAddProperty({
                ...addProperty,
                [event.target.name]: event.target.value
            }
        )
    }

    const onSubmitHandler = () => {
        dispatch({type: PROPERTY.INSERT_PROPERTY_ELEMENT, payload: addProperty});
    }

    return (
        <CommonLayout
            index="06"
            nextHref={`${window.location.pathname.toString().split('/')[2] === 'edit' ? `/property/edit/7/${id}` : '/property/add/7'}`}
            backtHref={`${window.location.pathname.toString().split('/')[2] === 'edit' ? `/property/edit/5/${id}` : '/property/add/5'}`}
            onSubmit={onSubmitHandler}
        >
            <>
                <div>
                    <h2 className="text-2xl font-semibold">
                        Your place description for client
                    </h2>
                    <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
                        Mention the best features of your accommodation, any special
                        amenities like fast Wi-Fi or parking, as well as things you like
                        about the neighborhood.
                    </span>
                </div>
                <Input name='title' value={addProperty.title} onChange={onChangeHandler}
                       placeholder="Title"/>
                <Textarea name='description' onChange={onChangeHandler} placeholder="Description" rows={14}>
                    {addProperty.description}
                </Textarea>
            </>
        </CommonLayout>
    );
};

export default PageAddListing6;
