import { auth } from '@/src/lib/auth/helper';
import { LINKS } from '@/src/utils/NavigationLinks';
import { redirect } from 'next/navigation';

const RoutePage = async () => {
  const user = await auth();

  if (user) redirect(LINKS.Landing.href);

  return <>toto</>;
};

export default RoutePage;
