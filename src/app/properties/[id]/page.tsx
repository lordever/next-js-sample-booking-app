"use client";

import React, {useEffect, useState} from 'react';
import {useParams} from "next/navigation";
import {PropertyModel} from "@/models/property.model";
import {fetchPropertyById} from "@/services/property.service";
import PropertyHeaderImage from "@/components/property-header-image/property-header-image.component";
import Link from "next/link";
import PropertyDetails from "@/components/property-details/property-details.component";
import {FaArrowLeft} from "react-icons/fa"
import Spinner from "@/components/spinner/spinner.component";
import PropertyImages from "@/components/property-images/property-images.component";
import BookmarkButton from "@/components/bookmark-button/bookmark-button.component";
import PropertyContactForm from "@/components/property-contact-form/property-contact-form.component";
import ShareButtons from "@/components/share-button/share-buttons.component";

const PropertyPage = () => {
    const {id} = useParams<{ id: string }>();
    const [property, setProperty] = useState<PropertyModel | null>(null);
    const [loading, setLoading] = useState(true);

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

    if (!property && !loading) {
        return (
            <h1 className="text-center text-2xl font-bold mt-10">Property not found</h1>
        )
    }

    return (
        <>
            {loading && <Spinner loading={loading}/>}
            {!loading && property && (
                <>
                    <PropertyHeaderImage image={property.images[0]}/>
                    <section>
                        <div className="container m-auto py-6 px-6">
                            <Link
                                href="/properties"
                                className="text-blue-500 hover:text-blue-600 flex items-center"
                            >
                                <FaArrowLeft className="mr-2"/> Back to Properties
                            </Link>
                        </div>
                    </section>
                    <section className="bg-blue-50">
                        <div className="container m-auto py-10 px-6">
                            <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
                                <PropertyDetails property={property}/>

                                <aside className="space-y-4">
                                    <BookmarkButton property={property}/>

                                    <ShareButtons property={property}/>

                                    <PropertyContactForm property={property}/>
                                </aside>
                            </div>
                        </div>
                    </section>
                    <PropertyImages images={property.images}/>
                </>
            )}
        </>
    );
};

export default PropertyPage;