import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { SignInProviders } from './signInProviders';

export type SignInCardProps = {};

export const SignInCard = ({}: SignInCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>
          {"If you don't have an account, this will create one for you."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignInProviders />
      </CardContent>
    </Card>
  );
};
