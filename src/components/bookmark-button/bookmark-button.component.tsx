import React, {FC} from 'react';
import {PropertyModel} from "@/models/property.model";
import {FaBookmark} from "react-icons/fa"

interface BookmarkButton {
    property: PropertyModel;
}

const BookmarkButton: FC<BookmarkButton> = ({property}) => {
    return (
        <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
        >
            <FaBookmark className="mr-2" /> Bookmark Property
        </button>
    );
};

export default BookmarkButton;