'use client';

import { ProviderButton } from '@/components/auth/signIn/providerButton';
import { SignInCredentials } from '@/components/auth/signIn/signInCredentials';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Divider } from '@/components/ui/divider';
import { Skeleton } from '@/components/ui/skeleton';
import { Typography } from '@/components/ui/typography';
import { LINKS } from '@/utils/NavigationLinks';
import { getServerUrl } from '@/utils/server-url';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useQuery } from '@tanstack/react-query';
import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { parseAsString, useQueryState } from 'nuqs';

export type SignInProvidersProps = {};

export const SignInProviders = ({}: SignInProvidersProps) => {
  const [callbackUrl] = useQueryState(
    'callbackUrl',
    parseAsString.withDefault(`${getServerUrl()}${LINKS.Landing.href}`),
  );

  const { data: providers, isPending } = useQuery({
    queryKey: ['providers'],
    queryFn: () => fetch(`/api/auth/providers`).then(res => res.json()),
  });

  if (isPending) {
    return (
      <div className="flex flex-col gap-4">
        <Button disabled>
          <ReloadIcon className="animate-spin" />
        </Button>
        <Divider>OR</Divider>
        <div className="flex flex-row gap-2">
          <Skeleton className="flex-1 h-9" />
          <Skeleton className="flex-1 h-9" />
        </div>
      </div>
    );
  }

  if (typeof providers !== 'object') {
    return (
      <Alert>
        <AlertTriangle size={16} />
        <AlertTitle>
          {
            "The provider is not available. It's due to a misconfiguration in the"
          }
          <Typography variant="code">auth.ts</Typography> file.
        </AlertTitle>
        <AlertDescription>
          Please contact{' '}
          <Typography variant="link" as={Link} href="">
            the support.
          </Typography>{' '}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <SignInCredentials />

      <Divider>or</Divider>

      <div className="flex flex-row justify-center gap-2">
        {providers.github ? (
          <ProviderButton providerId="github" callbackUrl={callbackUrl} />
        ) : null}
      </div>

      <Typography variant="small">
        {"You don't have an account ?"}
        <Typography variant="link" as={Link} href="/auth/signup">
          {' Sign up'}
        </Typography>
      </Typography>
    </div>
  );
};
