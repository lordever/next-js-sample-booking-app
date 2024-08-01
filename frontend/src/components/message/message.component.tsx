"use client";

import React, {FC, useState} from 'react';
import {MessageModel} from "@/models/message.model";
import {toast} from "react-toastify";
import {useGlobalContext} from "@/context/global.context";

interface MessageProps {
    message: MessageModel;
}

const Message: FC<MessageProps> = ({message}) => {

    const [isRead, setIsRead] = useState(message.read);
    const [isDeleted, setIsDeleted] = useState(false);
    const {setUnreadCount} = useGlobalContext();

    const handleReadClick = async () => {
        try {
            const res = await fetch(`/api/messages/${message._id}`, {method: "PUT"});

            if (res.status === 200) {
                const {read} = await res.json();
                setIsRead(read);
                setUnreadCount((prev) => (read ? --prev : ++prev));
                toast.success(`Marked as ${read ? 'Read' : 'New'}`);
            }
        } catch (e) {
            console.error(e);
            toast.error(`Mark message as ${isRead ? 'New' : 'Read'} was failed`);
        }
    }

    const handleDeleteClick = async () => {
        try {
            const res = await fetch(`/api/messages/${message._id}`, {method: "DELETE"});

            if (res.status === 200) {
                setIsDeleted(true);
                setUnreadCount((prev) => --prev)
                toast.success(`Message has been removed`);
            }
        } catch (e) {
            console.error(e);
            toast.error('Message removing has been failed');
        }
    }

    if (isDeleted) {
        return null;
    }

    return (
        <div
            className="relative bg-white p-4 rounded-md shadow-md border border-gray-200"
        >
            {!isRead && (
                <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md">New</div>
            )}
            <h2 className="text-xl mb-4">
                <span className="font-bold">Property Inquiry:</span>
                &nbsp;{message.property.name}
            </h2>
            <p className="text-gray-700">
                {message.body}
            </p>

            <ul className="mt-4">
                <li><strong>Name:&nbsp;</strong>{message.sender.username}</li>

                <li>
                    <strong>Reply Email:&nbsp;</strong>
                    <a href={`mailto:${message.email}`} className="text-blue-500">
                        {message.email}
                    </a>
                </li>
                <li>
                    <strong>Reply Phone:&nbsp;</strong>
                    <a href={`tel:${message.phone}`} className="text-blue-500">
                        {message.phone}
                    </a>
                </li>
                <li><strong>Received:&nbsp;</strong>{new Date(message.createdAt).toLocaleString()}</li>
            </ul>
            <button
                className={`mt-4 mr-3 ${isRead ? 'bg-gray-300' : 'bg-blue-500 text-white'} py-1 px-3 rounded-md`}
                onClick={handleReadClick}
            >
                {isRead ? 'Mark as New' : 'Mark as Read'}
            </button>
            <button className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md"
                    onClick={handleDeleteClick}
            >
                Delete
            </button>
        </div>
    );
};

export default Message;