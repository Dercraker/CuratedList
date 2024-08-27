"use server";

import { action } from "@/lib/backend/safe-actions";
import { sendEmail } from "@/lib/mail/sendEmail";
import { SiteConfig } from "@/site-config";
import { ContactSupportSchema } from "./contact-support.schema";

export const contactSupportAction = action
  .schema(ContactSupportSchema)
  .action(async ({ parsedInput: { email, subject, message } }) => {
    await sendEmail({
      from: SiteConfig.email.from,
      to: SiteConfig.email.contact,
      subject: `Support needed from ${email} - ${subject}`,
      text: message,
      reply_to: email,
    });
    return { message: "Your message has been sent to support." };
  });
