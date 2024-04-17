"use client";

import React, {FC, useEffect, useState} from 'react';
import {Session} from "next-auth";
import {toast} from "react-toastify";

interface UnreadMessageCountProps {
    session: Session | null;
}

const UnreadMessageCount: FC<UnreadMessageCountProps> = ({session}) => {
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        if (!session) {
            return;
        }

        const fetchUnreadCount = async () => {
            try {
                const data = await fetch("/api/messages/unread-count", {method: "GET"});
                const {count} = await data.json();

                setUnreadCount(count);
            } catch (error) {
                console.error(error);
                toast.error("Getting message count was failed");
            }
        };

        fetchUnreadCount();
    }, []);


    return unreadCount > 0 && (
        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold
        leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
            {unreadCount}
        </span>
    );
};

export default UnreadMessageCount;