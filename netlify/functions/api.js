/* eslint-disable import/extensions, import/prefer-default-export */
import 'regenerator-runtime/runtime';
import serverless from 'serverless-http';
import app from '../../server/app.js';

export const handler = serverless(app);
