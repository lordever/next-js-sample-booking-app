import React, { FC, PropsWithChildren } from 'react';
import { cookies } from 'next/headers';

interface DashboardLayoutProps extends PropsWithChildren {
  admin: React.ReactNode;
  user: React.ReactNode;
}

function getRole(): string | undefined {
  const role = cookies().get('role')?.value;
  return role;
}

const DashboardLayout: FC<DashboardLayoutProps> = ({
  admin,
  user,
  children,
}) => {
  const role = getRole();

  return (
    <>
      {children}

      <div className="p-8">{role === 'admin' ? admin : user}</div>
    </>
  );
};

export default DashboardLayout;
