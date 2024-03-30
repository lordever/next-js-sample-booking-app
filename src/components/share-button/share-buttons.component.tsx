import React, {FC} from 'react';
import {
    FacebookShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    EmailShareButton,
    FacebookIcon,
    TelegramIcon,
    XIcon,
    WhatsappIcon,
    EmailIcon
} from "react-share";
import {PropertyModel} from "@/models/property.model";

interface ShareButtonProps {
    property: PropertyModel;
}

const ShareButtons: FC<ShareButtonProps> = ({property}) => {

    const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`;


    return (
        <>
            <h3 className="text-xl font-bold text-center pt-2">Share this property</h3>

            <div className="flex gap-3 justify-center pb-5">
                <FacebookShareButton
                    url={shareUrl}
                    hashtag={`#${property.type}ForRent`}>
                    <FacebookIcon size={40} round={true}/>
                </FacebookShareButton>
                <TelegramShareButton
                    url={shareUrl}
                    title={`#${property.type}ForRent: ${property.name}`}>
                    <TelegramIcon size={40} round={true}/>
                </TelegramShareButton>
                <TwitterShareButton
                    url={shareUrl}
                    hashtags={[`${property.type.replace(/\s/g, "")}ForRent`]}
                    title={property.name}>
                    <XIcon size={40} round={true}/>
                </TwitterShareButton>
                <WhatsappShareButton
                    url={shareUrl}
                    title={`#${property.type}ForRent: ${property.name}`}
                    separator={"::"}>
                    <WhatsappIcon size={40} round={true}/>
                </WhatsappShareButton>
                <EmailShareButton
                    url={shareUrl}
                    subject={`Rent ${property.name}`}
                    body={`Check out this property listing`}>
                    <EmailIcon size={40} round={true}/>
                </EmailShareButton>
            </div>
        </>
    );
};

export default ShareButtons;