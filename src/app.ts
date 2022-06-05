import { Database } from 'sqlite3';
import express from 'express';
import bodyParser from 'body-parser';
import logger from './logger';
import ValidationError from './utils/errors/ValidationError';
import ServerError from './utils/errors/ServerError';
import NotFoundError from './utils/errors/NotFoundError';
import ErrorMessage from './utils/errors/ErrorMessage';

const app = express();
const jsonParser = bodyParser.json();

export default (db: Database) => {
  const logError = (error: { message: string; errorCode: string }) =>
    logger.error({ ...error });

  app.get('/health', (req, res) => res.send('Healthy'));

  app.post('/rides', jsonParser, (req, res) => {
    const startLatitude = Number(req.body.startLat);
    const startLongitude = Number(req.body.startLong);
    const endLatitude = Number(req.body.endLat);
    const endLongitude = Number(req.body.endLong);
    const riderName = req.body.riderName;
    const driverName = req.body.driverName;
    const driverVehicle = req.body.driverVehicle;

    if (
      startLatitude < -90 ||
      startLatitude > 90 ||
      startLongitude < -180 ||
      startLongitude > 180
    ) {
      const error = new ValidationError(
        ErrorMessage.INVALID_START_LATITUDE_LONGITUDE,
      );
      logError(error);
      return res.status(400).send(error);
    }

    if (
      endLatitude < -90 ||
      endLatitude > 90 ||
      endLongitude < -180 ||
      endLongitude > 180
    ) {
      const error = new ValidationError(
        ErrorMessage.INVALID_END_LATITUDE_LONGITUDE,
      );
      logError(error);
      return res.status(400).send(error);
    }

    if (typeof riderName !== 'string' || riderName.length < 1) {
      const error = new ValidationError(ErrorMessage.INVALID_RIDER_NAME);
      logError(error);
      return res.status(400).send(error);
    }

    if (typeof driverName !== 'string' || driverName.length < 1) {
      const error = new ValidationError(ErrorMessage.INVALID_DRIVER_NAME);
      logError(error);
      return res.status(400).send(error);
    }

    if (typeof driverVehicle !== 'string' || driverVehicle.length < 1) {
      const error = new ValidationError(ErrorMessage.INVALID_VEHICLE_NAME);
      logError(error);
      return res.status(400).send(error);
    }

    const values = [
      req.body.startLat,
      req.body.startLong,
      req.body.endLat,
      req.body.endLong,
      req.body.riderName,
      req.body.driverName,
      req.body.driverVehicle,
    ];

    db.run(
      'INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)',
      values,
      function (err) {
        if (err) {
          const error = new ServerError('Unknown error');
          logError(error);
          return res.status(500).send(error);
        }

        db.all(
          'SELECT * FROM Rides WHERE rideID = ?',
          this.lastID,
          function (err, rows) {
            if (err) {
              const error = new ServerError('Unknown error');
              logError(error);
              return res.status(500).send(error);
            }

            res.status(201).send(rows);
          },
        );
      },
    );
  });

  app.get('/rides', (req, res) => {
    db.all('SELECT * FROM Rides', function (err, rows) {
      if (err) {
        const error = new ServerError('Unknown error');
        logError(error);
        return res.status(500).send(error);
      }

      if (rows.length === 0) {
        const error = new NotFoundError('Could not find any rides');
        logError(error);
        return res.status(404).send(error);
      }

      res.send(rows);
    });
  });

  app.get('/rides/:id', (req, res) => {
    db.all(
      `SELECT * FROM Rides WHERE rideID='${req.params.id}'`,
      function (err, rows) {
        if (err) {
          const error = new ServerError('Unknown error');
          logError(error);
          return res.status(500).send(error);
        }

        if (rows.length === 0) {
          const error = new NotFoundError('Could not find any rides');
          logError(error);
          return res.status(404).send(error);
        }

        res.send(rows);
      },
    );
  });

  return app;
};
