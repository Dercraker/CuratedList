import { z } from "zod";

/**
 * Warning
 * The schema here is used in settings.action.ts with `z.union`
 * You should never make all properties optional in a union schema
 * because `union` will always return the first schema that matches
 * So if you make all properties optional, the first schema will always match
 * and the second schema will never be used
 */
export const SettingsDetailsFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

export const SettingsNotificationFormSchema = z.object({
  invoices: z.boolean(),
  promotions: z.boolean(),
});

export type SettingsDetailsFormType = z.infer<typeof SettingsDetailsFormSchema>;
export type SettingsNotificationFormType = z.infer<
  typeof SettingsNotificationFormSchema
>;
