import React from 'react';
import {PropertyModel} from "@/models/property.model";
import PropertyCard from "@/components/property-card/property.card.component";
import Link from "next/link";

async function fetchProperties() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/properties`);

        if (!res.ok) {
            throw new Error("Failed to fetch properties");
        }

        return res.json();
    } catch (error) {
        console.log("Failed to fetch properties", error);
    }
}


const HomeProperties = async () => {
    const properties = await fetchProperties();

    const recentProperties = properties
        .sort(() => Math.random() - Math.random())
        .slice(0, 3);

    return (
        <>
            <section className="px-4 py-6">
                <div className="container-xl lg:container m-auto">
                    <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
                        Recent Properties
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {recentProperties.length === 0 ? (<p>No Properties found</p>) :
                            recentProperties.map((property: Partial<PropertyModel>) => (
                                <PropertyCard key={property._id} property={property as PropertyModel}/>
                            ))
                        }
                    </div>
                </div>
            </section>

            <section className="m-auto max-w-lg my-10 px-6">
                <Link
                    href="/properties"
                    className="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
                >View All Properties</Link
                >
            </section>
        </>
    );
};

export default HomeProperties;