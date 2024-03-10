import React from 'react';
import properties from "@/properties.json";
import PropertyCard from "@/components/property-card/property.card.component";
import {PropertyModel} from "@/models/property.model";

const PropertiesPage = () => {
    return (
        <section className="px-4 py-6">
            <div className="container-xl lg:container m-auto px-4 py-6">
                {!Array.isArray(properties) ? (
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