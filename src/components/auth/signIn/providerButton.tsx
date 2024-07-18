import { getServerUrl } from '@/utils/server-url';
import { useMutation } from '@tanstack/react-query';
import { signIn } from 'next-auth/react';
import { GithubLogoSvg } from '../../svg/githubLogo.svg';
import { Button } from '../../ui/button';
import { Loader } from '../../ui/loader';

export type ProviderButtonProps = {
  providerId: string;
  callbackUrl: string;
};

export const ProviderButton = ({
  providerId,
  callbackUrl,
}: ProviderButtonProps) => {
  const oAuthSignInMutation = useMutation({
    mutationFn: () =>
      signIn(providerId, {
        callbackUrl: callbackUrl ?? `${getServerUrl()}`,
      }),
  });

  return (
    <Button
      className="bg-gray-100 hover:bg-gray-300 text-black"
      onClick={() => oAuthSignInMutation.mutate()}
      disabled={oAuthSignInMutation.isPending}>
      {oAuthSignInMutation.isPending ? (
        <Loader size={32} />
      ) : (
        <GithubLogoSvg size={32} />
      )}

      <span className="ml-2 text-base">Sign in with Github</span>
    </Button>
  );
};
