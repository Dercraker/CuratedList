"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useZodForm,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InlineTooltip } from "@/components/ui/tooltip";
import { SubmitButton } from "@/features/form/SubmitButton";
import type { User } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { BadgeCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createVerifyEmailAction } from "../verify-email/verify-email.action";
import { updateProfileAction } from "./edit-profile.action";
import type { ProfileFormType } from "./edit-profile.schema";
import { ProfileFormSchema } from "./edit-profile.schema";

type EditProfileFormProps = {
  defaultValues: User;
};

export const EditProfileForm = ({ defaultValues }: EditProfileFormProps) => {
  const form = useZodForm({
    schema: ProfileFormSchema,
    defaultValues: defaultValues,
  });
  const router = useRouter();

  const updateProfileMutation = useMutation({
    mutationFn: async (values: ProfileFormType) => {
      const result = await updateProfileAction(values);

      if (values.email !== defaultValues.email) {
        await createVerifyEmailAction("");
        toast.success(
          "You have updated your email. We have sent you a new email verification link.",
        );
        router.push("/");
        return;
      }

      if (!result?.data) {
        toast.error(result?.serverError);
        return;
      }

      toast.success("Profile updated");
      router.refresh();
    },
  });

  return (
    <Form
      form={form}
      onSubmit={async (v) => updateProfileMutation.mutateAsync(v)}
      disabled={updateProfileMutation.isPending}
      className="flex flex-col gap-4"
    >
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="" {...field} value={field.value ?? ""} />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1">
              <span>Email</span>
              {defaultValues.emailVerified ? (
                <InlineTooltip title="Email verified. If you change your email, you will need to verify it again.">
                  <BadgeCheck size={16} />
                </InlineTooltip>
              ) : null}
            </FormLabel>
            <FormControl>
              <Input placeholder="" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <SubmitButton className="w-fit self-end" size="sm">
        Save
      </SubmitButton>
    </Form>
  );
};
