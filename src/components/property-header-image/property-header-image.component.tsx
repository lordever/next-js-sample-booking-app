import React, {FC} from 'react';
import Image from "next/image";

interface PropertyHeaderImageProps {
    image: string;
}

const PropertyHeaderImage: FC<PropertyHeaderImageProps> = ({image}) => {
    return (
        <section>
            <div className="container-xl m-auto">
                <div className="grid grid-cols-1">
                    <Image
                        src={`/images/properties/${image}`}
                        alt=""
                        height={0}
                        width={0}
                        sizes="100vw"
                        className="object-cover h-[400px] w-full"
                        priority={true}
                    />
                </div>
            </div>
        </section>
    );
};

export default PropertyHeaderImage;