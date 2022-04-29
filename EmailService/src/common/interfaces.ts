import { Attachment } from "postmark";

export interface Variant {
  field: string;
  value: string;
}

export interface GroupVariant {
  title: string;
  image: Variant[];
  text: Variant[];
}

export interface File {
  name: string;
  base64File: string;
}

export interface RequestData {
  threekitConfUrl: string;
  customerData: {
    contactName: string;
    companyName: string;
    email: string;
    phone: string;
    zipCode: string;
    state: string;
    address: string;
    notes: string;
  };
  productData: {
    title: string;
    quantity: string;
    sku: string;
  };
  snapshots: File[] | undefined;
  customizedData: {
    shopifyVariants: Variant[];
    threekitVariants: GroupVariant[];
  };
}

export interface Template extends RequestData {
  imageSrcUrl: string;
}

export interface Email {
  postmarkKey: string;
  from: string;
  to: string;
  clientEmail: string;
  templateId: number;
  clientTemplateId: number;
  templateModel: object;
  attachments: Attachment[];
}

export interface PostmarkTemplate {
  configurationUrl: string; //configuration url
  companyName: string; //client company name
  companyContactName: string; //client company contact name
  companyEmail: string; //client company email
}
