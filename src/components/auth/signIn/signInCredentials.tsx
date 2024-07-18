'use client';

import AutoForm, { AutoFormSubmit } from '@/components/ui/auto-form';
import { CredentialSchema } from '@/features/auth/signIn/credential.schema';
import { LINKS } from '@/utils/NavigationLinks';
import { getServerUrl } from '@/utils/server-url';
import { useMutation } from '@tanstack/react-query';
import { signIn } from 'next-auth/react';
import { parseAsString, useQueryState } from 'nuqs';

export type SignInCredentialsProps = {};

export const SignInCredentials = ({}: SignInCredentialsProps) => {
  const [callbackUrl] = useQueryState(
    'callbackUrl',
    parseAsString.withDefault(`${getServerUrl()}${LINKS.Landing.href}`),
  );

  const { mutateAsync, data, error, isPending } = useMutation({
    mutationFn: async ({ email, password }: CredentialSchema) => {
      await signIn('credentials', {
        email,
        password,
        callbackUrl,
      });
    },
  });

  return (
    <AutoForm
      formSchema={CredentialSchema}
      fieldConfig={{
        email: {
          inputProps: {
            placeholder: 'Your email',
          },
        },
        password: {
          inputProps: {
            type: 'password',
            placeholder: 'Your secret password',
          },
        },
      }}
      onSubmit={({ email, password }) => {
        console.log(data);
        mutateAsync({ email, password });
      }}>
      <AutoFormSubmit>Login</AutoFormSubmit>
    </AutoForm>
  );
};
