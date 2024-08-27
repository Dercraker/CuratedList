"use server";

import { auth } from "@/lib/auth/helper";
import { action } from "@/lib/backend/safe-actions";
import { sendEmail } from "@/lib/mail/sendEmail";
import { prisma } from "@/lib/prisma";
import { SiteConfig } from "@/site-config";
import { ContactFeedbackSchema } from "./contact-feedback.schema";

export const contactSupportAction = action
  .schema(ContactFeedbackSchema)
  .action(async ({ parsedInput: data }) => {
    const user = await auth();

    const email = user?.email ?? data.email;

    const feedback = await prisma.feedback.create({
      data: {
        message: data.message,
        review: Number(data.review) || 0,
        userId: user?.id,
        email,
      },
    });

    await sendEmail({
      from: SiteConfig.email.from,
      to: SiteConfig.email.contact,
      subject: `New feedback from ${email}`,
      text: `Review: ${feedback.review}\n\nMessage: ${feedback.message}`,
      reply_to: email,
    });

    return { message: "Your feedback has been sent to support." };
  });
