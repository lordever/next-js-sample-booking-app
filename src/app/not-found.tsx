import React from 'react';
import NoRecords from '@/components/no-records/no-records.component';

const NotFoundPage = () => (
  <NoRecords
    title="Page Not Found"
    description="The page you are looking for does not exist."
    info
  />
);

export default NotFoundPage;
