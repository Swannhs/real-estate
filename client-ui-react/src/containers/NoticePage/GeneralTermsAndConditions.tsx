import React, {FC, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import i18n from "i18next";
import {getAllNoticesActions} from "../../redux/actions/staticDataActions";

const GeneralTermsAndConditions: FC = () => {
    const dispatch = useDispatch<any>();
    const {success, data} = useSelector((state: any) => state.static.notices);
    const [generalTermsAndConditions, setGeneralTermsAndConditions] = React.useState<string>("");

    useEffect(() => {
        if (success) {
            switch (i18n.language) {
                case 'en':
                    setGeneralTermsAndConditions(data?.gtc.generalTermsAndConditionsEn);
                    break;
                case 'gr':
                    setGeneralTermsAndConditions(data?.gtc.generalTermsAndConditionsGr);
                    break;
                case 'it':
                    setGeneralTermsAndConditions(data?.gtc.generalTermsAndConditionsIt);
                    break;
                case 'fr':
                    setGeneralTermsAndConditions(data?.gtc.generalTermsAndConditionsFr);
                    break;
                default:
                    setGeneralTermsAndConditions(data?.gtc.generalTermsAndConditionsEn);

            }
        } else {
            dispatch(getAllNoticesActions());
        }
    }, [dispatch, success]);

    return (
        <div className='container'>
            <div className='min-h-screen' dangerouslySetInnerHTML={{__html: generalTermsAndConditions}}/>
        </div>
    );
};

export default GeneralTermsAndConditions;