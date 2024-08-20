import React from 'react';
import { fetchProperties } from '@/services/property.service';
import FeaturedPropertyCard from '@/components/featured-property-card/featured-property-card.component';
import { PropertyModel } from '@/models/property.model';

const FeaturedProperties = async () => {
  const properties = await fetchProperties({ showFeatured: true, pageSize: 2 });

  return (
    properties?.content.length > 0 && (
      <section className="bg-blue-100 px-4 pt-6 pb-10">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
            Featured Properties
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {properties?.content.map((property: Partial<PropertyModel>) => (
              <FeaturedPropertyCard
                key={property._id}
                property={property as PropertyModel}
              />
            ))}
          </div>
        </div>
      </section>
    )
  );
};

export default FeaturedProperties;
