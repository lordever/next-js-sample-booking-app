'use client';

import React, { FC, useEffect } from 'react';
import NoRecords from '@/components/no-records/no-records.component';

interface OverallErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const OverallError: FC<OverallErrorProps> = ({ error, reset }) => {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <NoRecords
      title={'Something went wrong'}
      description={error.message.toString()}
      reset={reset}
      error
    />
  );
};

export default OverallError;
