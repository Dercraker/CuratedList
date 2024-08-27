"use server";

import { authAction } from "@/lib/backend/safe-actions";
import { z } from "zod";
import {
  SettingsDetailsFormSchema,
  SettingsNotificationFormSchema,
} from "./settings.schema";

export const updateSettingsAction = authAction
  .schema(z.union([SettingsDetailsFormSchema, SettingsNotificationFormSchema]))
  .action(async ({ parsedInput: input }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // Update the data from the server and return the fresh data
    return input;
  });
