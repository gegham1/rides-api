import { resolve } from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import rideController from './controllers/RideController';
import validatePostRideBody from './validators/validatePostRideBody';
import validateParamId from './validators/validateParamId';

const app = express();
const jsonParser = bodyParser.json();
const appVersion = process.env.VERSION;
const docVersion = `v${appVersion ? appVersion[0] : 1}`;
const swaggerDocument = YAML.load(resolve(`docs/api/${docVersion}/main.yaml`));

app.use(jsonParser);
app.use(helmet());

app.get('/health', (req, res) => res.send('Healthy'));
app.get('/rides', rideController.getAllRides);
app.post('/rides', validatePostRideBody, rideController.createRide);
app.get('/rides/:id', validateParamId, rideController.getById);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;
