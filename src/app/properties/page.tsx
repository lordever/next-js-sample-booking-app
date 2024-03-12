import React from 'react';
import PropertyCard from "@/components/property-card/property.card.component";
import {PropertyModel} from "@/models/property.model";
import {fetchProperties} from "@/services/property.service";

const PropertiesPage = async () => {
    const properties = await fetchProperties();

    //Sort properties by date
    properties.sort((a: PropertyModel, b: PropertyModel) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return (
        <section className="px-4 py-6">
            <div className="container-xl lg:container m-auto px-4 py-6">
                {properties.length === 0 ? (
                    <p>No properties found</p>
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

export default PropertiesPage;