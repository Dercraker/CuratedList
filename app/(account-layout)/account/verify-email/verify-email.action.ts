"use server";

import { ActionError, authAction } from "@/lib/backend/safe-actions";
import { sendEmail } from "@/lib/mail/sendEmail";
import { prisma } from "@/lib/prisma";
import { getServerUrl } from "@/lib/server-url";
import VerifyEmail from "@email/VerifyEmail";
import { nanoid } from "nanoid";
import { z } from "zod";

export const createVerifyEmailAction = authAction
  .schema(z.string())
  .action(async ({ ctx }) => {
    if (ctx.user.emailVerified) {
      throw new ActionError("Email is already verified");
    }

    const verificationToken = await prisma.verificationToken.create({
      data: {
        identifier: ctx.user.email,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
        token: nanoid(32),
      },
    });

    await sendEmail({
      to: ctx.user.email,
      subject: "Verify your email",
      react: VerifyEmail({
        url: `${getServerUrl()}/account/verify-email?token=${verificationToken.token}`,
      }),
    });
  });
