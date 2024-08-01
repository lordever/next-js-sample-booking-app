export interface PropertyModel {
  _id: string;
  type: string;
  name: string;
  owner: string;
  beds: number;
  baths: number;
  square_feet: number;
  createdAt: string;
  description: string;
  rates: RatesModel;
  location: LocationModel;
  images: string[];
  amenities: string[];
}

export interface RatesModel {
  monthly?: number;
  weekly?: number;
  nightly?: number;
}

export interface LocationModel {
  city: string;
  street: string;
  state: string;
  zipcode: string;
}
