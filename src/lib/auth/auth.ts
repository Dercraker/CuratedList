import { PrismaAdapter } from '@auth/prisma-adapter';
import { User } from '@prisma/client';
import NextAuth, { Session } from 'next-auth';
import { env } from '../env/server';
import { prisma } from '../prisma';
import {
  credentialsOverrideJwt,
  credentialsSignInCallback,
} from './credentialsProvider';
import { getNextAuthConfigurationProviders } from './getNextAuthConfigurationProviders';

export const {
  handlers,
  signIn,
  signOut,
  auth: baseAuth,
} = NextAuth(req => ({
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    // newUser: '/auth/new-user',
  },
  theme: {
    logo: 'images/logo-text.png',
  },
  adapter: PrismaAdapter(prisma),
  providers: getNextAuthConfigurationProviders(),
  session: {
    strategy: 'database',
  },
  secret: env.NEXTAUTH_SECRET,
  callbacks: {
    session(params) {
      if (params.newSession) return params.session;

      const typedParams = params as unknown as {
        session: Session;
        user?: User;
      };

      if (!typedParams.user) return typedParams.session;

      typedParams.user.passwordHash = null;

      return typedParams.session;
    },
  },
  events: {
    signIn: credentialsSignInCallback(req),
    createUser: async message => {
      const user = message.user;

      if (!user.email) {
        return;
      }
    },
  },
  jwt: credentialsOverrideJwt,
}));
