import React, { FC } from 'react';
import { FaExclamationTriangle, FaExclamationCircle } from 'react-icons/fa';
import Link from 'next/link';

interface NoRecordsProps {
  title: string;
  description: string;
  error?: boolean;
  info?: boolean;
  reset?: () => void;
}

const NoRecords: FC<NoRecordsProps> = ({
  title,
  description,
  error = false,
  info = false,
  reset,
}) => {
  return (
    <section className="bg-blue-50 min-h-screen flex-grow">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-24 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <div className="flex justify-center">
            {info && (
              <FaExclamationTriangle className="fas fa-exclamation-triangle fa-5x text-8xl text-yellow-400" />
            )}

            {error && (
              <FaExclamationCircle className="fa-5x text-8xl text-yellow-400" />
            )}

            {typeof info === 'undefined' && typeof error === 'undefined' && (
              <FaExclamationTriangle className="fas fa-exclamation-triangle fa-5x text-8xl text-yellow-400" />
            )}
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold mt-4 mb-2">{title}</h1>
            <p className="text-gray-500 text-xl mb-10">{description}</p>
            {!reset && (
              <Link
                href="/"
                className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-4 px-6 rounded"
              >
                Go Home
              </Link>
            )}

            {reset && (
              <button
                className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-4 px-6 rounded"
                onClick={reset}
              >
                Try again
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="flex-grow"></div>
    </section>
  );
};

export default NoRecords;
