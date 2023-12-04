import React, {useEffect} from 'react';

interface LocationPickerProps {
    zoom?: number;
    defaultLocation: Location;
    onLocationChange: (location: Location) => void;
}

interface Location {
    lat: number;
    lng: number;
}

const LocationPicker: React.FC<LocationPickerProps> = ({zoom = 12, defaultLocation, onLocationChange}) => {
    let map: google.maps.Map;
    let marker: google.maps.Marker;

    useEffect(() => {
        const mapElement = document.getElementById('map');

        if (mapElement) {
            map = new google.maps.Map(mapElement, {
                zoom: zoom,
                center: defaultLocation,
            });

            marker = new google.maps.Marker({
                position: defaultLocation,
                map,
                draggable: true,
                animation: google.maps.Animation.DROP,
            });

            // Marker dragend event listener
            google.maps.event.addListener(marker, 'dragend', () => {
                const newPosition = marker.getPosition();
                if (newPosition) {
                    const newMarkerPosition: Location = {
                        lat: newPosition.lat(),
                        lng: newPosition.lng(),
                    };
                    onLocationChange(newMarkerPosition);
                }
            });

            // Map click event listener
            google.maps.event.addListener(map, 'click', (event: any) => {
                marker.setPosition(event.latLng);
                const newMarkerPosition: Location = {
                    lat: event.latLng.lat(),
                    lng: event.latLng.lng(),
                };
                onLocationChange(newMarkerPosition);
            });
        }
    }, []);

    return <div id="map" className='h-[100%] w-[100%]'></div>;
};

export default LocationPicker;
