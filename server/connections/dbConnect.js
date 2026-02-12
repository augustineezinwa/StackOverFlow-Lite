/* eslint-disable import/extensions */
import { ConvexHttpClient } from 'convex/browser';
import { makeFunctionReference } from 'convex/server';

const convexUrl = process.env.CONVEX_URL;
const client = convexUrl ? new ConvexHttpClient(convexUrl) : null;

const formatRows = (result) => {
  if (Array.isArray(result)) {
    return { rows: result };
  }
  if (result && Array.isArray(result.rows)) {
    return result;
  }
  if (result === null || result === undefined) {
    return { rows: [] };
  }
  return { rows: [result] };
};

const runConvexRequest = async (request) => {
  if (!request || typeof request !== 'object') {
    return { rows: [] };
  }
  if (!client) {
    throw new Error('Missing CONVEX_URL environment variable');
  }
  const { type, path, args } = request;
  const ref = makeFunctionReference(path);
  if (type === 'query') {
    return formatRows(await client.query(ref, args));
  }
  return formatRows(await client.mutation(ref, args));
};

export default {
  query: request => runConvexRequest(request)
};
