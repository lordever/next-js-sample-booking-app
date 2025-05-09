'use client';

import React, { startTransition } from 'react';
import { setRole } from '@/app/actions/set-role';

const DashboardPage = () => {
  return (
    <div className="p-8">
      <h1>Select Role</h1>

      <div className="flex flex-row gap-2">
        <button
          className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded"
          onClick={() =>
            startTransition(() => {
              (async () => {
                await setRole('admin');
              })();
            })
          }
        >
          Admin
        </button>
        <button
          className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded"
          onClick={() =>
            startTransition(() => {
              (async () => {
                await setRole('user');
              })();
            })
          }
        >
          User
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;
