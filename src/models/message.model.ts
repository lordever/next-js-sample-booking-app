export interface MessageModel {
    _id: string;
    recipient: string;
    name: string;
    email: string;
    phone: string;
    body: string;
    createdAt: string;
    read: boolean;
    sender: { _id: string, username: string };
    property: { _id: string, name: string };
}