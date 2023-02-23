import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import morgan from 'morgan';
import cors from 'cors';
import appRootPath from 'app-root-path';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import baseRouter from './router/baseRouter.js';

const app = express();

//const __filename = fileURLToPath(import.meta.url);
//const __dirname = path.dirname(__filename);
const swaggerDocument = YAML.load(`${process.cwd()}/swagger.yaml`);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', baseRouter);
// app.use(express.static(path.join(__dirname, '..', '/client/public')));
app.use(express.static(appRootPath.resolve('/client/public')));
app.get('/', (request, response) => {
  response.sendFile(appRootPath.resolve('/client/public/index.html'));
});
app.use('*', (request, response) => response.status(404).json({
  status: 'fail',
  message: 'This route is yet to be specified.'
}));

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`server is active on port ${port}`));

export default app;
