"use server";

import {
  setupResendCustomer,
  setupStripeCustomer,
} from "@/lib/auth/auth-config-setup";
import { ActionError, action } from "@/lib/backend/safe-actions";
import { prisma } from "@/lib/prisma";
import { EmailActionSchema } from "./email.schema";

export const addEmailAction = action
  .schema(EmailActionSchema)
  .action(async ({ parsedInput: { email } }) => {
    try {
      const userData = {
        email,
      };

      const stripeCustomerId = await setupStripeCustomer(userData);
      const resendContactId = await setupResendCustomer(userData);

      await prisma.user.create({
        data: {
          ...userData,
          stripeCustomerId,
          resendContactId,
        },
      });

      return { email };
    } catch {
      throw new ActionError("The email is already in use");
    }
  });
