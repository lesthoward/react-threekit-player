import { Attachment, ServerClient } from "postmark";

import { Email, PostmarkTemplate } from "../common/interfaces";
import { email_variables } from "../common/constants";

export const buildEmailModel = (
  template: PostmarkTemplate,
  attachments: Attachment[]
): Email => {
  return {
    postmarkKey: process.env.POSTMARK_SERVER_KEY ?? "",
    from: process.env.POSTMARK_EMAIL_FROM ?? "",
    to: process.env.POSTMARK_EMAIL_TO ?? "",
    templateId: parseInt(process.env.POSTMARK_EMAIL_TEMPLATE ?? ""),
    clientTemplateId: parseInt(
      process.env.POSTMARK_EMAIL_CLIENT_TEMPLATE ?? ""
    ),
    templateModel: {
      product_name:
        process.env.EMAIL_PRODUCT_NAME ?? email_variables.product_name,
      company_name:
        process.env.EMAIL_COMPANY_NAME ?? email_variables.company_name,
      company_address:
        process.env.EMAIL_COMPANY_SITE ?? email_variables.company_address,
      support_email:
        process.env.EMAIL_COMPANY_SUPPORT_EMAIL ??
        email_variables.support_email,
      help_url: process.env.EMAIL_COMPANY_INFO_SITE ?? email_variables.help_url,
      product_url: template.configurationUrl,
      name: template.companyName,
      username: template.companyContactName,
      login_url: template.companyEmail,
    },
    attachments: attachments,
    clientEmail: template.companyEmail,
  };
};

export const sendEmail = (emailData: Email) => {
  return new Promise<string>(async (resolve, reject) => {
    const client = new ServerClient(emailData.postmarkKey);

    await client.sendEmailBatchWithTemplates(
      [
        {
          From: emailData.from,
          To: emailData.to,
          InlineCss: true,
          TemplateId: emailData.templateId,
          TemplateModel: emailData.templateModel,
          Attachments: emailData.attachments,
        },
        {
          From: emailData.from,
          To: emailData.clientEmail,
          InlineCss: true,
          TemplateId: emailData.clientTemplateId,
          TemplateModel: emailData.templateModel,
        },
      ],
      (error, result) => {
        if (error) {
          reject(error.message);
        }

        if (result) {
          resolve(result.map((r) => r.Message).join(" | "));
        }
      }
    );
  });
};
