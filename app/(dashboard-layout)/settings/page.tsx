import type { PageParams } from "@/types/next";
import { SettingsDetailsForm } from "./SettingsDetailsForm";

export default async function RoutePage(props: PageParams<{}>) {
  /**
   * Usually in this page you would fetch the data from the database
   * So the form mount with the current data
   */
  return (
    <SettingsDetailsForm
      defaultValues={{
        name: "Jean",
        email: "jean@gmail.com",
      }}
    />
  );
}
