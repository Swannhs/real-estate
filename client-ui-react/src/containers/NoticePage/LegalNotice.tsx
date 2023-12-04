import React, {FC, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getAllNoticesActions} from "../../redux/actions/staticDataActions";
import i18n from "i18next";

const LegalNotice: FC = () => {
    const dispatch = useDispatch<any>();
    const {success, data} = useSelector((state: any) => state.static.notices);
    const [legalNotice, setLegalNotice] = React.useState<string>("");

    useEffect(() => {
        if (success) {
            switch (i18n.language) {
                case 'en':
                    setLegalNotice(data?.legalNotice.legalNoticeEn);
                    break;
                case 'gr':
                    setLegalNotice(data?.legalNotice.legalNoticeGr);
                    break;
                case 'it':
                    setLegalNotice(data?.legalNotice.legalNoticeIt);
                    break;
                case 'fr':
                    setLegalNotice(data?.legalNotice.legalNoticeFr);
                    break;
                default:
                    setLegalNotice(data?.legalNotice.legalNoticeEn);

            }
        } else {
            dispatch(getAllNoticesActions());
        }
    }, [dispatch, success]);

    return (
        <div className='container'>
            <div className='min-h-screen' dangerouslySetInnerHTML={{__html: legalNotice}}/>
        </div>
    );
};

export default LegalNotice;