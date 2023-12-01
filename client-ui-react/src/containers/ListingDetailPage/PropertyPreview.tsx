import React, {FC} from 'react';
import CommonLayout from "../AccountPage/CommonLayout";
import PropertyDetails from "./PropertyDeatails";

const PropertyPreview:FC = () => {
    return (
        <CommonLayout>
            <PropertyDetails/>
        </CommonLayout>
    );
};

export default PropertyPreview;