"use client";

import React, {useEffect, useState} from 'react';
import {useParams} from "next/navigation";
import {PropertyModel} from "@/models/property.model";
import {fetchPropertyById} from "@/services/property.service";

const PropertyPage = () => {
    const {id} = useParams<{ id: string }>();
    const [property, setProperty] = useState<PropertyModel | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchPropertyData = async () => {
            if (!id) return;
            try {
                const property = await fetchPropertyById(id);
                setProperty(property);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        if (property === null) {
            fetchPropertyData();
        }

    }, [id, property]);

    return (
        <div>
            Property Page
        </div>
    );
};

export default PropertyPage;