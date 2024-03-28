"use client";

import React, {FC, useEffect, useState} from 'react';
import pin from "@/assets/images/pin.svg";
import {PropertyModel} from "@/models/property.model";
import {fromAddress, setDefaults} from "react-geocode";
import {toast} from "react-toastify";
import Spinner from "@/components/spinner/spinner.component";
import {set} from "mongoose";
import {Map, Marker} from "react-map-gl";
import Image from "next/image";

interface PropertyMapProps {
    property: PropertyModel;
}

const PropertyMap: FC<PropertyMapProps> = ({property}) => {
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [viewPort, setViewPort] = useState({
        latitude: 0,
        longitude: 0,
        zoom: 15,
        width: "100%",
        height: "500px"
    });
    const [loading, setLoading] = useState(true);

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
                    setLoading(false);
                    return;
                }

                const { lat, lng } = res.results[0].geometry.location;

                setLat(lat);
                setLng(lng);
                setViewPort({
                    ...viewPort,
                    latitude: lat,
                    longitude: lng,
                });

                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };

        fetchCoords();
    }, []);

    if (loading) {
        return <Spinner loading={loading}/>
    }

    return !loading && (
        <Map
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
            mapLib={import('mapbox-gl')}
            initialViewState={{
                longitude: lng,
                latitude: lat,
                zoom: 15,
            }}
            style={{ width: '100%', height: 500 }}
            mapStyle='mapbox://styles/mapbox/streets-v9'
        >
            <Marker longitude={lng} latitude={lat} anchor='bottom'>
                <Image src={pin} alt='location' width={40} height={40} />
            </Marker>
        </Map>
    );
};

export default PropertyMap;