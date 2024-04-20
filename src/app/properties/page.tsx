import React from 'react';
import PropertySearchForm from "@/components/property-search-form/property-search-form.component";
import Properties from "@/components/properties/properties.component";

const PropertiesPage = async () => {
    return <>
        <section className="bg-blue-700 py-4">
            <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
                <PropertySearchForm/>
            </div>
        </section>

        <Properties />
    </>

};

export default PropertiesPage;