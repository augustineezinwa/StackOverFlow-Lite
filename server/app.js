import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import validator from 'express-validator';
import baseRouter from './router/baseRouter';

const app = express();

const swaggerDocument = YAML.load(`${process.cwd()}/swagger.yaml`);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.use(morgan('dev'));
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', baseRouter);
app.get('/', (request, response) => response.status(200).json({
  status: 'success',
  message: 'Welcome to StackOverFlow-Lite'
}));
app.use('*', (request, response) => response.status(404).json({
  status: 'fail',
  message: 'This route is yet to be specified.'
}));

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`server is active on port ${port}`));

export default app;
