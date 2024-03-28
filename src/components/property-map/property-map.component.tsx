"use client";

import React, {FC, useEffect, useState} from 'react';
import pin from "@/assets/images/pin.svg";
import {PropertyModel} from "@/models/property.model";
import {fromAddress, setDefaults} from "react-geocode";
import Spinner from "@/components/spinner/spinner.component";
import {Map, Marker, ViewState} from "react-map-gl";
import Image from "next/image";

interface PropertyMapProps {
    property: PropertyModel;
}

const PropertyMap: FC<PropertyMapProps> = ({property}) => {
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);
    const [viewPort, setViewPort] = useState({
        latitude: 0,
        longitude: 0,
        zoom: 15,
        width: "100%",
        height: "500px"
    });
    const [loading, setLoading] = useState(true);
    const [geoCodeError, setGeoCodeError] = useState(false);

    setDefaults({
        key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY || "",
        language: "en",
        region: "us"
    });

    useEffect(() => {
        const fetchCoords = async () => {
            try {
                const res = await fromAddress(
                    `${property.location.street} ${property.location.city} ${property.location.state} ${property.location.zipcode}`
                );

                //  Check for results
                if (res.results.length === 0) {
                    // No results found
                    setGeoCodeError(true);
                    return;
                }

                const {lat, lng} = res.results[0].geometry.location;

                setLat(lat);
                setLng(lng);
                setViewPort((prevViewport) => ({
                    ...prevViewport,
                    latitude: lat,
                    longitude: lng
                }));
            } catch (error) {
                console.error(error);
                setGeoCodeError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchCoords();
    }, []);

    if (loading) {
        return <Spinner loading={loading}/>
    }

    if (geoCodeError) {
        return <div className="text-xl">No location data found</div>
    }

    return !loading && (
        <Map
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
            mapLib={import('mapbox-gl')}
            initialViewState={{
                latitude: lat,
                longitude: lng,
                zoom: 15
            }}
            style={{width: '100%', height: 500}}
            mapStyle='mapbox://styles/mapbox/streets-v9'
        >
            <Marker longitude={lng} latitude={lat} anchor='bottom'>
                <Image src={pin} alt='location' width={40} height={40}/>
            </Marker>
        </Map>
    );
};

export default PropertyMap;