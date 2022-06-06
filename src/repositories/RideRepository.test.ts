import { RideRepository } from './RideRepository';
import sqlite3 from 'sqlite3';
import buildSchemas from '../schemas';
import logger from '../logger';
import ErrorMessage from '../errors/ErrorMessage';

jest.mock('../logger', () => ({
  error: jest.fn(),
  info: jest.fn(),
}));

describe('RideRepository tests', () => {
  let repository: RideRepository;
  const db = new (sqlite3.verbose().Database)(':memory:');

  beforeEach(async () => {
    await db.serialize();
    buildSchemas(db);
    repository = new RideRepository(db);
  });

  afterEach(async () => {
    await db.run('DROP TABLE Rides');
    jest.clearAllMocks();
  });

  it('should run runAsync with BEGIN query', async () => {
    const runSpy = jest
      .spyOn(repository, 'runAsync')
      .mockImplementation(jest.fn());
    await repository.startTransaction();
    expect(runSpy).toBeCalledWith('BEGIN');
  });

  it('should run runAsync with COMMIT query', async () => {
    const runSpy = jest
      .spyOn(repository, 'runAsync')
      .mockImplementation(jest.fn());
    await repository.commitTransaction();
    expect(runSpy).toBeCalledWith('COMMIT');
  });

  it('should run runAsync with ROLLBACK query', async () => {
    const runSpy = jest
      .spyOn(repository, 'runAsync')
      .mockImplementation(jest.fn());
    await repository.rollbackTransaction();
    expect(runSpy).toBeCalledWith('ROLLBACK');
  });

  describe('create method tests', () => {
    it('should return server error and rollback', async () => {
      jest.spyOn(repository, 'runAsync').mockImplementation(jest.fn());
      const rollbackSpy = jest
        .spyOn(repository, 'rollbackTransaction')
        .mockImplementation(jest.fn());
      jest.spyOn(repository, 'runAllAsync').mockImplementation(async () => []);

      try {
        await repository.create({ riderName: 'test' });
      } catch (error: any) {
        expect(rollbackSpy).toHaveBeenCalled();
        expect(logger.error).toHaveBeenCalled();
        expect(error.message).toBe(ErrorMessage.UNKNOWN);
      }
    });

    it('should return array with ride', async () => {
      jest.spyOn(repository, 'runAsync').mockImplementation(jest.fn());
      jest
        .spyOn(repository, 'runAllAsync')
        .mockImplementation(async () => [{ id: 1 }]);

      const result = await repository.create({ riderName: 'test' });
      expect(result).toMatchObject([{ id: 1 }]);
    });
  });

  describe('getById method tests', () => {
    it('should log and return server error', async () => {
      jest.spyOn(repository, 'runAllAsync').mockImplementation(async () => {
        throw new Error('something bad');
      });

      try {
        await repository.getById(1);
      } catch (error: any) {
        expect(logger.error).toHaveBeenCalled();
        expect(error.message).toBe(ErrorMessage.UNKNOWN);
      }
    });

    it('should return the ride object', async () => {
      jest
        .spyOn(repository, 'runAllAsync')
        .mockImplementation(async () => [{ id: 1 }]);

      const result = await repository.getById(1);
      expect(result).toMatchObject({ id: 1 });
    });
  });

  describe('getAll method tests', () => {
    it('should log and return server error', async () => {
      jest.spyOn(repository, 'runAllAsync').mockImplementation(async () => {
        throw new Error('something bad');
      });

      try {
        await repository.getAll();
      } catch (error: any) {
        expect(logger.error).toHaveBeenCalled();
        expect(error.message).toBe(ErrorMessage.UNKNOWN);
      }
    });

    it('should return the ride object', async () => {
      jest
        .spyOn(repository, 'runAllAsync')
        .mockImplementation(async () => [{ id: 1 }]);

      const result = await repository.getAll();
      expect(result).toMatchObject([{ id: 1 }]);
    });
  });
});
