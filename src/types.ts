export interface Location {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  lat: number;
  lng: number;
  category: string;
  address: string;
  imageUrl: string;
  rating: number;
  workingHours?: string;
  phoneNumber?: string;
  enCategory?: string;
  enShortDescription?: string;
  enDescription?: string;
}
