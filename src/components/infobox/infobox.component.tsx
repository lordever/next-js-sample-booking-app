import React, {FC, memo} from 'react';
import Link from "next/link";

interface ButtonInfo {
    text: string;
    backgroundColor: string;
    link: string;
}

interface InfoboxProps {
    heading: string;
    backgroundColor?: string;
    textColor?: string;
    buttonInfo: ButtonInfo;
    children: React.ReactNode;
}

const Infobox: FC<InfoboxProps> = ({
                                       backgroundColor = "bg-gray-100",
                                       textColor = "text-gray-800",
                                       heading,
                                       buttonInfo,
                                       children
                                   }) => {
    return (
        <div className={`${backgroundColor} p-6 rounded-lg shadow-md`}>
            <h2 className={`${textColor} text-2xl font-bold`}>{heading}</h2>
            <p className={`${textColor} mt-2 mb-4`}>
                {children}
            </p>
            <Link
                href={buttonInfo.link}
                className={`${buttonInfo.backgroundColor} inline-block text-white rounded-lg px-4 py-2 hover:bg-gray-700 hover:opacity-80`}
            >
                {buttonInfo.text}
            </Link>
        </div>
    );
};

export default memo(Infobox);