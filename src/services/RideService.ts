import RideDTO from '../dto/RideDTO';
import rideRepository from '../repositories/RideRepository';
import NotFoundError from '../errors/NotFoundError';
import Ride from '../interfaces/Ride';
import ErrorMessage from '../errors/ErrorMessage';
import RideRepositoryInterface from '../interfaces/RideRepositoryInterface';
import RideServiceInterface from '../interfaces/RideServiceInterface';

export class RideService implements RideServiceInterface {
  private readonly rideRepository: RideRepositoryInterface;

  constructor(rideRepository: RideRepositoryInterface) {
    this.rideRepository = rideRepository;
  }

  async create(data: RideDTO): Promise<Ride[]> {
    return await this.rideRepository.create(data);
  }

  async getAll(): Promise<Ride[]> {
    const rides = await this.rideRepository.getAll();
    if (rides.length === 0) {
      throw new NotFoundError(ErrorMessage.RIDES_NOT_FOUND);
    }

    return rides;
  }

  async getById(id: number): Promise<Ride> {
    const ride = await this.rideRepository.getById(id);
    if (!ride) {
      throw new NotFoundError(ErrorMessage.RIDES_NOT_FOUND);
    }

    return ride;
  }
}

export default new RideService(rideRepository);
