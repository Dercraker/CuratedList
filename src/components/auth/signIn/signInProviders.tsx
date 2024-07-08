'use client';

import { Alert, AlertDescription, AlertTitle } from '@/src/components/ui/alert';
import { Button } from '@/src/components/ui/button';
import { Divider } from '@/src/components/ui/divider';
import { Skeleton } from '@/src/components/ui/skeleton';
import { Typography } from '@/src/components/ui/typography';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useQuery } from '@tanstack/react-query';
import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { ProviderButton } from './providerButton';
import { parseAsString, useQueryState } from 'nuqs';
import { getServerUrl } from '@/src/utils/server-url';
import { LINKS } from '@/src/utils/NavigationLinks';

export type SignInProvidersProps = {};

export const SignInProviders = ({}: SignInProvidersProps) => {
  const [callbackUrl] = useQueryState(
    'callbackUrl',
    parseAsString.withDefault(`${getServerUrl()}${LINKS.Landing.href}`),
  );

  const { data: providers, isPending } = useQuery({
    queryFn: () => fetch(`/api/auth/providers`).then(res => res.json()),
    queryKey: ['providers'],
  });

  if (isPending) {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="w-80 h-9" />
        <Button disabled>
          <ReloadIcon className="animate-spin" />
        </Button>
        <Divider>OR</Divider>
        <Skeleton className="w-12 h-9" />
        <Skeleton className="w-12 h-9" />
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
      {/* <SignInCredentialsAndMagicLinkForm /> */}
      <Divider>or</Divider>

      <div className="flex flex-col gap-2">
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
