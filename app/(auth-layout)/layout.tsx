import { PropsWithChildren } from 'react';
import { AuthNavbar } from './_components/authNavbar';

const RouteLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <AuthNavbar />
      {children}
    </>
  );
};

export default RouteLayout;
