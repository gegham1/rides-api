import { promisify } from 'util';
import ServerError from '../errors/ServerError';
import logger from '../logger';
import sqliteInstance from '../sqlite3';
import RideRepositoryInterface from '../interfaces/RideRepositoryInterface';
import Ride from '../interfaces/Ride';
import { Database } from 'sqlite3';
import ErrorMessage from '../errors/ErrorMessage';

export class RideRepository implements RideRepositoryInterface {
  private readonly db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  runAsync(...params: any[]) {
    return promisify(this.db.run.bind(this.db, ...params))();
  }

  runAllAsync(...params: any[]): Promise<any[]> {
    return promisify(this.db.all.bind(this.db, ...params))() as Promise<any[]>;
  }

  async startTransaction(): Promise<void> {
    await this.runAsync('BEGIN');
  }

  async commitTransaction(): Promise<void> {
    await this.runAsync('COMMIT');
  }

  async rollbackTransaction(): Promise<void> {
    await this.runAsync('ROLLBACK');
  }

  async findById(id: number): Promise<Ride[]> {
    const rows = await this.runAllAsync(
      'SELECT * FROM Rides WHERE rideID = ?',
      id,
    );
    return rows as Ride[];
  }

  async create(data: Partial<Ride>): Promise<Ride[]> {
    const values = [
      data.startLat,
      data.startLong,
      data.endLat,
      data.endLong,
      data.riderName,
      data.driverName,
      data.driverVehicle,
    ];
    const query =
      'INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)';

    try {
      await this.startTransaction();
      await this.runAsync(query, values);
      const [lastRow] = await this.runAllAsync(
        'SELECT last_insert_rowid() as id',
      );

      if (!lastRow?.id) {
        throw new Error('ride record was not created');
      }

      const rides = await this.findById(lastRow.id);

      await this.commitTransaction();

      return rides as Ride[];
    } catch (err) {
      await this.rollbackTransaction();

      logger.error(err);
      throw new ServerError(ErrorMessage.UNKNOWN);
    }
  }

  async getById(id: number): Promise<Ride> {
    try {
      const rows = await this.findById(id);

      return rows[0] as Ride;
    } catch (err) {
      logger.error(err);
      throw new ServerError(ErrorMessage.UNKNOWN);
    }
  }

  async getAll(): Promise<Ride[]> {
    try {
      const rows = await this.runAllAsync('SELECT * FROM Rides');
      return rows as Ride[];
    } catch (err) {
      logger.error(err);
      throw new ServerError(ErrorMessage.UNKNOWN);
    }
  }
}

export default new RideRepository(sqliteInstance);
