export interface AddOrderArgs {
  userId: string;
  distance: number;
  price: number;
  location: { latitude: number; longitude: number };
  status: string;
  rideType: string;
}
