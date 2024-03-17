export interface PropertyModel {
    _id: string;
    type: string;
    name: string;
    beds: number;
    baths: number;
    square_feet: number;
    createdAt: string;
    description: string;
    rates: {
        monthly?: number;
        weekly?: number;
        nightly?: number;
    }
    location: LocationModel;
    images: string[];
    amenities: string[];
}

export interface LocationModel {
    city: string;
    street: string;
    state: string;
    zipcode: string;
}