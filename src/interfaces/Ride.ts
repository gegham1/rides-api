export default interface Ride extends Record<string, string | number> {
  rideID: number;
  startLat: number;
  startLong: number;
  endLat: number;
  endLong: number;
  riderName: string;
  driverName: string;
  driverVehicle: string;
  created: string;
}
