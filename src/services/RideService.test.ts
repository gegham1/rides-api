import { RideService } from './RideService';
import getMockRidePayload from '../../tests/stubs/getMockRidePayload';
import ErrorMessage from '../errors/ErrorMessage';

describe('RideService', () => {
  let service: RideService;
  const mockRepo = {
    create: jest.fn(),
    getById: jest.fn(),
    getAll: jest.fn(),
  };

  beforeEach(() => {
    service = new RideService(mockRepo);
  });

  afterEach(jest.clearAllMocks);

  it('should call create method of repo with data and return result', async () => {
    const mockData = getMockRidePayload();
    mockRepo.create.mockImplementationOnce(() => [{ id: 1 }]);

    const result = await service.create(mockData);
    expect(mockRepo.create).toHaveBeenCalledWith(mockData);
    expect(result).toMatchObject([{ id: 1 }]);
  });

  describe('getAll method tests', () => {
    it('should call getAll method of repo and return the result', async () => {
      mockRepo.getAll.mockImplementationOnce(() => [{ id: 1 }]);

      const result = await service.getAll();
      expect(mockRepo.getAll).toHaveBeenCalled();
      expect(result).toMatchObject([{ id: 1 }]);
    });

    it('should throw not found error', async () => {
      mockRepo.getAll.mockImplementationOnce(() => []);

      try {
        await service.getAll();
      } catch (error: any) {
        expect(error.message).toBe(ErrorMessage.RIDES_NOT_FOUND);
      }
    });
  });

  describe('getById method tests', () => {
    it('should call getById method of repo and return the result', async () => {
      mockRepo.getById.mockImplementationOnce(() => [{ id: 1 }]);

      const result = await service.getById(1);
      expect(mockRepo.getById).toHaveBeenCalledWith(1);
      expect(result).toMatchObject([{ id: 1 }]);
    });

    it('should throw not found error', async () => {
      mockRepo.getById.mockImplementationOnce(() => []);

      try {
        await service.getById(1);
      } catch (error: any) {
        expect(error.message).toBe(ErrorMessage.RIDES_NOT_FOUND);
      }
    });
  });
});
