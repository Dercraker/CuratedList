import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/src/lib/utils';
import { ComponentPropsWithoutRef } from 'react';
import { SignInProviders } from './signInProviders';

export type SignInCardProps = {} & ComponentPropsWithoutRef<'div'>;

export const SignInCard = ({ ...props }: SignInCardProps) => {
  return (
    <Card className={cn('max-w-xl', { ...props })}>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Sign in</CardTitle>
        <CardDescription className="text-base">
          {"If you don't have an account, this will create one for you."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignInProviders />
      </CardContent>
    </Card>
  );
};
