const convexUrl = process.env.CONVEX_URL;

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

const callConvex = async (request) => {
  const endpoint = `${convexUrl}/api/${request.type === 'query' ? 'query' : 'mutation'}`;
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      path: request.path,
      args: request.args || {},
      format: 'json'
    })
  });

  const payload = await response.json();
  if (!response.ok || payload.status !== 'success') {
    const message = payload.errorMessage || `Convex request failed with status ${response.status}`;
    throw new Error(message);
  }

  return payload.value;
};

const runConvexRequest = async (request) => {
  if (!request || typeof request !== 'object') {
    return { rows: [] };
  }
  if (!convexUrl) {
    throw new Error('Missing CONVEX_URL environment variable');
  }
  return formatRows(await callConvex(request));
};

export default {
  query: request => runConvexRequest(request)
};
