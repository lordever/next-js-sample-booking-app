import {PropertyModel} from "@/models/property.model";

export type SellerInfo = { name: string, email: string, phone: string }
export type FormFieldsType = Partial<PropertyModel & { seller_info: SellerInfo }>;