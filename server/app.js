import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import fs from 'fs';
import appRootPath from 'app-root-path';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import baseRouter from './router/baseRouter.js';

const app = express();

let swaggerDocument = null;
const swaggerPaths = [
  `${process.cwd()}/swagger.yaml`,
  `${process.cwd()}/server/swagger.yaml`,
  `${process.cwd()}/build/server/swagger.yaml`
];

swaggerPaths.some((swaggerPath) => {
  if (fs.existsSync(swaggerPath)) {
    try {
      swaggerDocument = YAML.load(swaggerPath);
      return true;
    } catch (error) {
      swaggerDocument = null;
    }
  }
  return false;
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());
if (swaggerDocument) {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
app.use('/api/v1', baseRouter);
app.use(express.static(appRootPath.resolve('/client/public')));
app.get('/', (request, response) => {
  response.sendFile(appRootPath.resolve('/client/public/index.html'));
});
app.use('*', (request, response) => response.status(404).json({
  status: 'fail',
  message: 'This route is yet to be specified.'
}));
export default app;
