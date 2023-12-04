import NcInputNumber from "../../components/NcInputNumber/NcInputNumber";
import useWindowSize from "../../hooks/useWindowResize";
import moment from "moment";
import React, {FC, useState} from "react";
import {
    DayPickerRangeController,
    FocusedInputShape,
    isInclusivelyAfterDay
} from "react-dates";
import CommonLayout from "./CommonLayout";
import {useDispatch, useSelector} from "react-redux";
import {PROPERTY} from "../../redux/actionTypes";
import {useParams} from "react-router-dom";

export interface PageAddListing9Props {
}

const PageAddListing9: FC<PageAddListing9Props> = () => {
    const dispatch = useDispatch<any>();
    const property = useSelector((state: any) => state.property.addProperty);
    const [addProperty, setAddProperty] = useState(property);
    const [focusedInputSectionCheckDate, setFocusedInputSectionCheckDate] = useState<FocusedInputShape>("startDate");
    const windowSize = useWindowSize();
    const {id} = useParams<any>();

    const getDaySize = () => {
        if (windowSize.width <= 600) {
            return undefined;
        }
        return 56;
    };

    const onNcChangeHandler = (name: string, value: any) => {
        setAddProperty({
            ...addProperty,
            [name]: value
        })
    }

    const onDateRangeChangeHandler = (date: any) => {
        setAddProperty({
            ...addProperty,
            selectedDate: date
        })
    }

    const onSubmitHandler = () => {
        dispatch({type: PROPERTY.INSERT_PROPERTY_ELEMENT, payload: addProperty})
    }

    return (
        <CommonLayout
            index="09"
            nextHref={`${window.location.pathname.toString().split('/')[2] === 'edit' ? `/property/edit/10/${id}` : '/property/add/10'}`}
            backtHref={`${window.location.pathname.toString().split('/')[2] === 'edit' ? `/property/edit/8/${id}` : '/property/add/8'}`}
            onSubmit={onSubmitHandler}
        >
            <>
                <div>
                    <h2 className="text-2xl font-semibold">How long can guests stay?</h2>
                    <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
                        Shorter trips can mean more reservations, but you'll turn over your
                        space more often.
                    </span>
                </div>
                <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
                {/* FORM */}
                <div className="space-y-7">
                    <NcInputNumber label="Max number of Guests" onChange={value => onNcChangeHandler('maxGuest', value)}
                                   defaultValue={property.maxGuest ?? 0}/>
                </div>

                {/*  */}
                <div>
                    <h2 className="text-2xl font-semibold">Set your availability</h2>
                    <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
                        Editing your calendar is easy—just select a date to block or unblock
                        it. You can always make changes after you publish.
                    </span>
                </div>

                <div className="nc-SetYourAvailabilityData flex justify-center">
                    <DayPickerRangeController
                        startDate={addProperty.selectedDate?.startDate}
                        endDate={addProperty.selectedDate?.endDate}
                        onDatesChange={(date) => onDateRangeChangeHandler(date)}
                        focusedInput={focusedInputSectionCheckDate}
                        onFocusChange={(focusedInput) =>
                            setFocusedInputSectionCheckDate(focusedInput || "startDate")
                        }
                        initialVisibleMonth={null}
                        numberOfMonths={1}
                        daySize={getDaySize()}
                        hideKeyboardShortcutsPanel={false}
                        isOutsideRange={(day) => !isInclusivelyAfterDay(day, moment())}
                    />
                </div>
            </>
        </CommonLayout>
    );
};

export default PageAddListing9;
