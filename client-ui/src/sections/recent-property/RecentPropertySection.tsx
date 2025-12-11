import React from 'react';
import { EstateInterface } from '@/types/property';
import Link from 'next/link';
import Image from 'next/image';
import { API_CONFIG } from '@/config/api';

interface Props {
    properties: EstateInterface[];
}

const RecentPropertySection: React.FC<Props> = ({ properties }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {properties?.map((property) => (
                <Link href={`/property/${property.id}`} key={property.id} className="block">
                    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        <div className="h-48 bg-gray-200 relative">
                             {property.estateGalleries && property.estateGalleries.length > 0 ? (
                                 <Image
                                    src={`${API_CONFIG.ESTATE_SERVICE_URL}/public/v1/uploads/users/${property.estateGalleries[0].compressedImageName}`}
                                    alt={property.title}
                                    fill
                                    className="object-cover"
                                 />
                             ) : (
                                 <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                                    No Image
                                 </div>
                             )}
                        </div>
                        <div className="p-4">
                            <h3 className="font-semibold text-lg truncate">{property.title}</h3>
                            <p className="text-gray-600">{property.estatePrice} {property.estatePriceType}</p>
                            <p className="text-sm text-gray-500 truncate">
                                {property.location?.addressLine1}, {property.location?.city}
                            </p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default RecentPropertySection;
