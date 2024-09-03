import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from '@azure/functions';

export async function HelloWorld(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);

  const name = request.query.get('name') || (await request.text()) || 'world';
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  return {
    body: `Hello, ${name}!`,
    headers: headers,
  };
}

app.http('HelloWorld', {
  methods: ['GET', 'POST'],
  authLevel: 'anonymous',
  handler: HelloWorld,
});
