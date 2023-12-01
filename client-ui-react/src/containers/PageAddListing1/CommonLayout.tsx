import React, {useEffect, useState} from "react";
import {FC} from "react";
import ButtonSecondary from "../../shared/Button/ButtonSecondary";
import {Helmet} from "react-helmet";
import {useDispatch, useSelector} from "react-redux";
import {Prompt, Redirect} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import ButtonPublish from "../../shared/Button/ButtonPublish";
import {PROPERTY} from "../../redux/actionTypes";

export interface CommonLayoutProps {
    index: string;
    nextHref: string;
    backtHref: string;
    nextBtnText?: string;
    children: any;
    onSubmit?: () => void;
    onSubmitting?: boolean;
}

const CommonLayout: FC<CommonLayoutProps> = ({
                                                 index = "01",
                                                 children,
                                                 nextHref,
                                                 nextBtnText,
                                                 backtHref,
                                                 onSubmit,
                                                 onSubmitting = false
                                             }) => {
    const dispatch = useDispatch();
    const {isAuthenticated} = useSelector((state: any) => state.auth);
    const [prompt, setPrompt] = useState<boolean>(false);
    const path = window.location.pathname.toString().split('/')[2];

    useEffect(() => {
        const unloadCallback = (event: any) => {
            event.preventDefault();
            alert("Changes you made will not be saved.");
            event.returnValue = "";
            return "";
        };

        window.addEventListener("beforeunload", unloadCallback);
        return () => {
            window.removeEventListener("beforeunload", unloadCallback);
            setPrompt(true);
            dispatch({type: PROPERTY.REMOVE_PROPERTY_ELEMENT});
        };
    }, []);

    if (!isAuthenticated) {
        return <Redirect to={'/login'}/>
    }
    const onClickHandler = () => {
        onSubmit && onSubmit();
    }
    return (
        <div
            className={`nc-PageAddListing1 px-4 max-w-3xl mx-auto pb-24 pt-14 sm:py-24 lg:pb-32`}
            data-nc-id="PageAddListing1"
        >
            <Helmet>
                <title>{import.meta.env.VITE_APP_TITLE} || {window.location.pathname.toString().split('/')[2] === 'edit' ? 'Edit Property' : 'Add Property'}</title>
            </Helmet>
            <Prompt message='You have unsaved changes, are you sure you want to leave?' when={prompt}/>
            <ToastContainer/>
            <div className="space-y-11">
                <div>
                    <span className="text-4xl font-semibold">{index}</span>{" "}
                    <span className="text-lg text-neutral-500 dark:text-neutral-400">
                        / 10
                    </span>
                </div>

                {/* --------------------- */}
                <div className="listingSection__wrap ">{children}</div>

                {/* --------------------- */}
                <div className="flex justify-end space-x-5">
                    <ButtonSecondary href={backtHref}>Go back</ButtonSecondary>
                    <ButtonPublish disabled={onSubmitting} onClick={onClickHandler} href={nextHref}>
                        {nextBtnText || "Continue"}
                    </ButtonPublish>
                </div>
            </div>
        </div>
    );
};

export default CommonLayout;
