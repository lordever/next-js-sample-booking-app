'use client';

import React, { FC, useEffect, useState } from 'react';
import { PropertyModel } from '@/models/property.model';
import PropertyCard from '@/components/property-card/property.card.component';
import { fetchProperties } from '@/services/property.service';
import { toast } from 'react-toastify';
import Spinner from '@/components/spinner/spinner.component';
import Pagination from '@/components/pagination/pagination.component';

const Properties: FC = () => {
  const [properties, setProperties] = useState<PropertyModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const processProperties = async () => {
      try {
        const data = await fetchProperties({ page, pageSize });
        setProperties(data.content);
        setTotalItems(data.totalElements);
      } catch (error) {
        console.error(error);
        toast.error('Getting properties was failed');
      } finally {
        setLoading(false);
      }
    };

    processProperties();
  }, [page, pageSize]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (loading) {
    return <Spinner loading={loading} />;
  }

  return (
    <>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
          {!properties || properties.length === 0 ? (
            <p>No search results found</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {properties.map((property: Partial<PropertyModel>) => (
                <PropertyCard
                  key={property._id}
                  property={property as PropertyModel}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <Pagination
        page={page}
        pageSize={pageSize}
        totalItems={totalItems}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default Properties;
