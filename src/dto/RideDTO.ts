import { IsNotEmpty, IsNumber, IsString, Min, Max } from 'class-validator';
import ErrorMessage from '../errors/ErrorMessage';
import Ride from '../interfaces/Ride';

export default class RideDTO implements Partial<Ride> {
  @IsString({
    message: ErrorMessage.INVALID_RIDER_NAME,
  })
  @IsNotEmpty({
    message: ErrorMessage.INVALID_RIDER_NAME,
  })
  riderName: string;

  @IsString({
    message: ErrorMessage.INVALID_DRIVER_NAME,
  })
  @IsNotEmpty({
    message: ErrorMessage.INVALID_DRIVER_NAME,
  })
  driverName: string;

  @IsString({
    message: ErrorMessage.INVALID_VEHICLE_NAME,
  })
  @IsNotEmpty({
    message: ErrorMessage.INVALID_VEHICLE_NAME,
  })
  driverVehicle: string;

  @IsNumber(
    {},
    {
      message: ErrorMessage.INVALID_END_LATITUDE_LONGITUDE,
    },
  )
  @Min(-180, {
    message: ErrorMessage.INVALID_END_LATITUDE_LONGITUDE,
  })
  @Max(180, {
    message: ErrorMessage.INVALID_END_LATITUDE_LONGITUDE,
  })
  endLong: number;

  @IsNumber(
    {},
    {
      message: ErrorMessage.INVALID_END_LATITUDE_LONGITUDE,
    },
  )
  @Min(-90, {
    message: ErrorMessage.INVALID_END_LATITUDE_LONGITUDE,
  })
  @Max(90, {
    message: ErrorMessage.INVALID_END_LATITUDE_LONGITUDE,
  })
  endLat: number;

  @IsNumber(
    {},
    {
      message: ErrorMessage.INVALID_START_LATITUDE_LONGITUDE,
    },
  )
  @Min(-90, {
    message: ErrorMessage.INVALID_START_LATITUDE_LONGITUDE,
  })
  @Max(90, {
    message: ErrorMessage.INVALID_START_LATITUDE_LONGITUDE,
  })
  startLat: number;

  @IsNumber(
    {},
    {
      message: ErrorMessage.INVALID_START_LATITUDE_LONGITUDE,
    },
  )
  @Min(-180, {
    message: ErrorMessage.INVALID_START_LATITUDE_LONGITUDE,
  })
  @Max(180, {
    message: ErrorMessage.INVALID_START_LATITUDE_LONGITUDE,
  })
  startLong: number;

  constructor(payload: {
    riderName: string;
    driverName: string;
    driverVehicle: string;
    endLong: number;
    endLat: number;
    startLat: number;
    startLong: number;
  }) {
    this.riderName = payload.riderName;
    this.driverName = payload.driverName;
    this.driverVehicle = payload.driverVehicle;
    this.endLong = payload.endLong;
    this.endLat = payload.endLat;
    this.startLat = payload.startLat;
    this.startLong = payload.startLong;
  }

  [k: string]: string | number | undefined;
}
