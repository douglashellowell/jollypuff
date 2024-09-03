import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from '@azure/functions';

const fortunes = [
  'You will have a long and happy life.',
  'Diligence is the mother of good luck.',
  'Patience is your alley at the moment. Don’t worry!',
  'Nothing is impossible to a willing heart.',
  'Don’t worry about money. The best things in life are free.',
  'Don’t pursue happiness – create it.',
  'Courage is not the absence of fear; it is the conquest of it.',
  'Nothing is so much to be feared as fear.',
  'All things are difficult before they are easy.',
  'The real kindness comes from within you.',
  'A ship in the harbor is safe, but that’s not why ships are built.',
  'You don’t need strength to let go of something. What you really need is understanding.',
  'If you want the rainbow, you have to tolerate the rain.',
  'Fear is interest paid on a debt you may not owe.',
  'Hardly anyone knows how much is gained by ignoring the future.',
];

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
    body: fortunes[Math.floor(Math.random() * fortunes.length)],
    headers: headers,
  };
}

app.http('HelloWorld', {
  methods: ['GET', 'POST'],
  authLevel: 'anonymous',
  handler: HelloWorld,
});
