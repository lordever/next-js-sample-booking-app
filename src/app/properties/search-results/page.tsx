"use client";

import React, {useEffect, useState} from 'react';
import {useSearchParams} from "next/navigation";
import {PropertyModel} from "@/models/property.model";

const SearchResultsPage = () => {
    const [properties, setProperties] = useState<PropertyModel[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const searchParams = useSearchParams();
    const location = searchParams.get("location");
    const propertyType = searchParams.get("propertyType");

    useEffect(() => {
        const fetchPropertiesBySearchParams = async () => {
            try {
                const res = await fetch(`/api/properties/search?location=${location}&propertyType=${propertyType}`);

                if (res.status === 200) {
                    const data: PropertyModel[] = await res.json();
                    setProperties(data);
                } else {
                    setProperties([]);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false)
            }
        }

        fetchPropertiesBySearchParams();
    }, [location, propertyType])

    console.log(properties);

    return (
        <div>

        </div>
    );
};

export default SearchResultsPage;