export interface PropertyModel {
    _id: string;
    type: string;
    name: string;
    beds: number;
    baths: number;
    square_feet: number;
    createdAt: string;
    rates: {
        monthly?: number;
        weekly?: number;
        nightly?: number;
    }
    location: {
        city: string;
        street: string;
        state: string;
        zipcode: string;
    }
    images: string[];
}