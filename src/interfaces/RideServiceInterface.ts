import Ride from './Ride';

export default interface RideServiceInterface {
  create(value: Partial<Ride>): Promise<Ride[]>;
  getById(id: number): Promise<Ride>;
  getAll(): Promise<Ride[]>;
}
