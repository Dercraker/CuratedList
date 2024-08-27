import type { PageParams } from "@/types/next";
import { SettingsNotificationForm } from "./SettingsNotificationForm";

export default async function RoutePage(props: PageParams<{}>) {
  return (
    <SettingsNotificationForm
      defaultValues={{
        invoices: false,
        promotions: true,
      }}
    />
  );
}
