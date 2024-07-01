import { NextAuthConfig } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { env } from '../env/server';
import { getCredentialsProvider } from './credentialsProvider';

type Providers = NonNullable<NextAuthConfig['providers']>;

export const getNextAuthConfigurationProviders = (): Providers => {
  const providers: Providers = [];

  if (env.AUTH_GITHUB_ID && env.AUTH_GITHUB_SECRET)
    providers.push(
      GithubProvider({
        allowDangerousEmailAccountLinking: true,
      }),
    );

  providers.push(getCredentialsProvider());

  return providers;
};
