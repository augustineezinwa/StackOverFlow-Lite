import serverless from 'serverless-http';
import app from '../../server/app.js';

const unwrapModule = (moduleRef) => {
  let resolved = moduleRef;
  while (resolved && resolved.default) {
    resolved = resolved.default;
  }
  return resolved || moduleRef;
};

const resolvedApp = unwrapModule(app);

if (typeof resolvedApp !== 'function') {
  throw new Error('Invalid Express app export for serverless handler');
}

export const handler = serverless(resolvedApp);
