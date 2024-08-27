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
  FormField,
  FormItem,
  FormMessage,
  useZodForm,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormUnsavedBar } from "@/features/form/FormUnsavedBar";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateSettingsAction } from "./settings.action";
import {
  SettingsDetailsFormSchema,
  type SettingsDetailsFormType,
} from "./settings.schema";

type ProductFormProps = {
  defaultValues: SettingsDetailsFormType;
};

export const SettingsDetailsForm = ({ defaultValues }: ProductFormProps) => {
  const form = useZodForm({
    schema: SettingsDetailsFormSchema,
    defaultValues,
  });
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (values: SettingsDetailsFormType) => {
      const result = await updateSettingsAction(values);

      if (!result || result.serverError) {
        toast.error("Failed to update settings");
        throw new Error("Failed to update settings");
      }

      router.refresh();
      form.reset(result.data as SettingsDetailsFormType);
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
          <CardTitle>Name</CardTitle>
          <CardDescription>
            Use a descriptive name to help you identify this product/bundle.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Email</CardTitle>
          <CardDescription>
            Use a valid email address to receive important notifications.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
    </FormUnsavedBar>
  );
};
