import React, {FC, useCallback, useState} from 'react';
import {PropertyModel} from "@/models/property.model";
import {FaBookmark} from "react-icons/fa"
import {toast} from "react-toastify";
import {useSession} from "next-auth/react";

interface BookmarkButton {
    property: PropertyModel;
}

const BookmarkButton: FC<BookmarkButton> = ({property}) => {

    const {data: session} = useSession();
    const userId = session?.user.id;

    const [isBookmarked, setIsBookmarked] = useState(false);

    const handleClick = useCallback(async () => {
        if (!userId) {
            toast.info("You need to sign it to bookmark the property");
            return;
        }

        try {
            const res = await fetch("/api/bookmarks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    propertyId: property._id
                })
            });

            if (res.status === 200) {
                const data = await res.json();
                toast.success(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
    }, [])

    return (
        <button
            onClick={handleClick}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
        >
            <FaBookmark className="mr-2"/> Bookmark Property
        </button>
    );
};

export default BookmarkButton;