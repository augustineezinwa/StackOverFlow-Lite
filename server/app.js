import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import baseRouter from './router/baseRouter';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());
app.use('/api/v1', baseRouter);

app.use('*', (req, res) => res.status(200).json({
  status: 'success',
  message: 'Welcome to StackOverFlow-Lite'
}));

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`server is active on port ${port}`));

export default app;
