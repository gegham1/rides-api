import Ride from './Ride';

export default interface RideRepositoryInterface {
  create(value: Partial<Ride>): Promise<Ride[]>;
  getById(id: number): Promise<Ride>;
  getAll(): Promise<Ride[]>;
}
