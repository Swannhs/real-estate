import React, {useEffect, useState} from 'react';
import {getPrivacyPolicyApi} from "../../apis/StaticData";
import {toast} from "react-toastify";
import {LoadingSpinner} from "../../shared/Loader/LoadingSpinner";
import {useSelector} from "react-redux";
import {StateInterface} from "../../redux/reducers/rootReducer";

const PrivacyPolicy = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const {language} = useSelector((state: StateInterface) => state.lang);
    const langUpperCase = language.charAt(0).toUpperCase()+ language.slice(1);
    const [data, setData] = useState<any>(null);

    const fetchPrivacyPolicy = () => {
        getPrivacyPolicyApi()
            .then((response) => {
                setData(response?.data?.data);
            })
            .catch((error) => toast.error(error?.response?.data?.message))
            .finally(() => setIsLoading(false));
    }

    useEffect(() => {
        fetchPrivacyPolicy();
    }, []);

    if (isLoading) {
        return <LoadingSpinner size={20} align='center'/>
    }
    return (
        <div className='container py-4 min-h-screen'>
            <div className='ck-content' dangerouslySetInnerHTML={{__html: data && data['description' + langUpperCase] as string}}/>
        </div>
    );
};

export default PrivacyPolicy;