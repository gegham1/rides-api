import Ride from '../../src/interfaces/Ride';

export default (): Partial<Ride>[] => [
  {
    rideID: 1,
    startLat: 45,
    startLong: 175,
    endLat: 80,
    endLong: 170,
    riderName: 'john',
    driverName: 'test',
    driverVehicle: 'hello dd',
  },
];
