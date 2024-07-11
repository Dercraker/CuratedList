import { PropsWithChildren } from 'react';
import { AuthNavbar } from './_components/authNavbar';

const RouteLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <AuthNavbar />
      <div className="w-full h-screen">{children}</div>
    </>
  );
};

export default RouteLayout;
