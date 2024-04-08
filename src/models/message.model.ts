export interface MessageModel {
    sender: { _id: string };
    property: { _id: string };
    recipient: string;
    name: string;
    email: string;
    phone: string;
    body: string;
    read: boolean;
}