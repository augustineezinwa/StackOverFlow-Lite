import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import fs from 'fs';
import appRootPath from 'app-root-path';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import baseRouter from './router/baseRouter.js';

const unwrapModule = (moduleRef) => {
  let resolved = moduleRef;
  while (resolved && resolved.default) {
    resolved = resolved.default;
  }
  return resolved || moduleRef;
};

const toMiddleware = (candidate, name) => {
  if (typeof candidate === 'function') return candidate;
  return (request, response, next) => next(new Error(`Invalid middleware: ${name}`));
};

const baseApiRouter = toMiddleware(unwrapModule(baseRouter), 'baseRouter');

const app = express();

let swaggerDocument = null;
const swaggerPath = `${process.cwd()}/swagger.yaml`;
if (fs.existsSync(swaggerPath)) {
  try {
    swaggerDocument = YAML.load(swaggerPath);
  } catch (error) {
    swaggerDocument = null;
  }
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());
if (swaggerDocument) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
app.use('/api/v1', baseApiRouter);
app.use(express.static(appRootPath.resolve('/client/public')));
app.get('/', (request, response) => {
  response.sendFile(appRootPath.resolve('/client/public/index.html'));
});
app.use('*', (request, response) => response.status(404).json({
  status: 'fail',
  message: 'This route is yet to be specified.'
}));
export default app;
