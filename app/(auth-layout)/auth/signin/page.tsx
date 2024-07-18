import { SignInCard } from '@/components/auth/signIn/signInCard';
import { auth } from '@/lib/auth/helper';
import { LINKS } from '@/utils/NavigationLinks';
import { redirect } from 'next/navigation';

const RoutePage = async () => {
  const user = await auth();

  if (user) redirect(LINKS.Landing.href);

  return (
    <div className="top-1/3 absolute flex flex-col flex-1 justify-center items-center w-full">
      <SignInCard />
    </div>
  );
};

export default RoutePage;
