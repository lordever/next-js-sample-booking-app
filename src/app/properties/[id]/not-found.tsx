import React from 'react';
import NoRecords from '@/components/no-records/no-records.component';

const PropertyNotFound = () => (
  <NoRecords
    title="Property Not Found"
    description="The property you are looking for does not exist."
    info
  />
);

export default PropertyNotFound;
