"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  useZodForm,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { FormUnsavedBar } from "@/features/form/FormUnsavedBar";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateSettingsAction } from "../settings.action";
import type { SettingsNotificationFormType } from "../settings.schema";
import { SettingsNotificationFormSchema } from "../settings.schema";

type ProductFormProps = {
  defaultValues: SettingsNotificationFormType;
};

export const SettingsNotificationForm = ({
  defaultValues,
}: ProductFormProps) => {
  const form = useZodForm({
    schema: SettingsNotificationFormSchema,
    defaultValues,
  });
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (values: SettingsNotificationFormType) => {
      const result = await updateSettingsAction(values);

      if (!result || result.serverError) {
        toast.error("Failed to update settings");
        throw new Error("Failed to update settings");
      }

      router.refresh();
      form.reset(result.data as SettingsNotificationFormType);
    },
  });

  return (
    <FormUnsavedBar
      form={form}
      onSubmit={async (v) => mutation.mutateAsync(v)}
      className="flex w-full flex-col gap-6 lg:gap-8"
    >
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>
            Enable or disable notifications for your course.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="invoices"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>Invoices</FormLabel>
                  <FormDescription>
                    Email notifications for new invoices and payment reminders.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="promotions"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>Promotions</FormLabel>
                  <FormDescription>
                    Email notifications for new promotions and discounts.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
    </FormUnsavedBar>
  );
};
