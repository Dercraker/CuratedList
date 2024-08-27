import type { PageParams } from "@/types/next";
import { SignInDialog } from "./SignInDialog";

export default async function RoutePage(props: PageParams<{}>) {
  return <SignInDialog />;
}
