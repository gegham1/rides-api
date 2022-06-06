enum ErrorMessage {
  INVALID_START_LATITUDE_LONGITUDE = 'Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively',
  INVALID_END_LATITUDE_LONGITUDE = 'End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively',
  INVALID_RIDER_NAME = 'Rider name must be a non empty string',
  INVALID_DRIVER_NAME = 'Driver name must be a non empty string',
  INVALID_VEHICLE_NAME = 'Vehicle name must be a non empty string',
  RIDES_NOT_FOUND = 'Could not find any rides',
  UNKNOWN = 'Unknown error',
  INVALID_ID_PARAM = 'Ride id must be a valid number',
}

export default ErrorMessage;
