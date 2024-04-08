"use client";

import React, {useEffect, useState} from 'react';
import {MessageModel} from "@/models/message.model";
import {fetchPropertyById} from "@/services/property.service";
import {toast} from "react-toastify";
import Message from "@/components/message/message.component";
import Spinner from "@/components/spinner/spinner.component";

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
        <section className="bg-blue-50">
            <div className="container m-auto py-24 max-w-6xl">
                <div
                    className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0"
                >
                    <h1 className="text-3xl font-bold mb-4">Your Messages</h1>

                    <div className="space-y-4">
                        {loading ? <Spinner loading={loading}/> : (
                            messages.length === 0 ? (
                                <p>You have no messages</p>
                            ) : (
                                messages.map((message) => (
                                    <Message key={message._id} message={message}/>
                                ))
                            )
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Messages;