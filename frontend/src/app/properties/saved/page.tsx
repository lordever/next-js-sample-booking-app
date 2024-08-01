'use client';

import React, {useEffect, useState} from 'react';
import {toast} from "react-toastify";
import {PropertyModel} from "@/models/property.model";
import Spinner from "@/components/spinner/spinner.component";
import PropertyCard from "@/components/property-card/property.card.component";

const SavedPropertiesPage = () => {
    const [properties, setProperties] = useState<PropertyModel[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSavedProperties = async () => {
            try {
                const res = await fetch("/api/bookmarks", {method: "GET"});

                if (res.status === 200) {
                    const data = await res.json();
                    setProperties(data);
                } else {
                    console.error(res.status);
                    toast.error("Fetching saved data failed");
                }
            } catch (error) {
                console.error(error);
                toast.error("Fetching saved data failed");
            } finally {
                setLoading(false);
            }
        };

        fetchSavedProperties();
    }, []);

    if (loading) {
        return <Spinner loading={loading}/>
    }

    return (
        <section className="px-4 py-6">
            <h1 className="text-2xl mb-4">Saved Properties</h1>
            <div className="container-xl lg:container m-auto px-4 py-6">
                {properties.length === 0 ? (
                    <p>No saved properties</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {properties.map((property: Partial<PropertyModel>) => (
                            <PropertyCard key={property._id} property={property as PropertyModel}/>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default SavedPropertiesPage;