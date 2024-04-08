"use client";

import React, {useEffect, useState} from 'react';
import {MessageModel} from "@/models/message.model";
import {fetchPropertyById} from "@/services/property.service";
import {toast} from "react-toastify";

const Messages = () => {

    const [messages, setMessages] = useState<MessageModel[]>([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await fetch("/api/messages");

                if (res.status === 200) {
                    const data = await res.json();
                    setMessages(data);
                }
            } catch (error) {
                console.error(error);
                toast.error("Fetching messages failed");
            } finally {
                setLoading(false);
            }
        };

        getMessages();
    }, []);

    return (
        <div>

        </div>
    );
};

export default Messages;