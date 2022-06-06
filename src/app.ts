import express from 'express';
import bodyParser from 'body-parser';
import rideController from './controllers/RideController';
import validatePostRideBody from './validators/validatePostRideBody';
import validateParamId from './validators/validateParamId';

const app = express();
const jsonParser = bodyParser.json();

app.use(jsonParser);

app.get('/health', (req, res) => res.send('Healthy'));
app.get('/rides', rideController.getAllRides);
app.post('/rides', validatePostRideBody, rideController.createRide);
app.get('/rides/:id', validateParamId, rideController.getById);

export default app;
