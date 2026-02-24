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



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());

app.use('/api/v1', baseRouter);
app.use(express.static(appRootPath.resolve('/client/public')));

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(null, {
    swaggerOptions: {
      url: "/swagger.yaml",
    },
  })
);

app.get('/', (request, response) => {
  response.sendFile(appRootPath.resolve('/client/public/index.html'));
});
app.use('*', (request, response) => response.status(404).json({
  status: 'fail',
  message: 'This route is yet to be specified.'
}));
export default app;
