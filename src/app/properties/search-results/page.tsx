"use client";

import React, {useEffect, useState} from "react";
import {PropertyModel} from "@/models/property.model";
import {useSearchParams} from "next/navigation";
import {FaArrowAltCircleLeft} from "react-icons/fa";
import Spinner from "@/components/spinner/spinner.component";
import PropertyCard from "@/components/property-card/property.card.component";
import Link from "next/link";
import PropertySearchForm from "@/components/property-search-form/property-search-form.component";


const SearchResultsPage = () => {
    const [properties, setProperties] = useState<PropertyModel[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const searchParams = useSearchParams();
    const location = searchParams.get('location');
    const propertyType = searchParams.get('propertyType');

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
                setLoading(false);
            }
        };

        fetchPropertiesBySearchParams();
    }, [location, propertyType]);

    return <>
        <section className="bg-blue-700 py-4">
            <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
                <PropertySearchForm/>
            </div>
        </section>

        {loading ? <Spinner loading={loading}/> : (
            <section className="px-4 py-6">
                <div className="container-xl lg:container m-auto px-4 py-6">
                    <Link href="/properties" className="inline-flex items-center text-blue-500 hover:underline mb-3">
                        <FaArrowAltCircleLeft className="mr-2 mb-1"/> Back to properties
                    </Link>
                    <h1 className="text-2xl mb-4">Search results</h1>
                    {properties.length === 0 ? (
                        <p>No search results found</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {properties.map((property: Partial<PropertyModel>) => (
                                <PropertyCard key={property._id} property={property as PropertyModel}/>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        )}
    </>
};

export default SearchResultsPage;