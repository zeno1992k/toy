import { createServer } from 'node:http';
import { GET } from '../api/videos.js';

const server = createServer(async (request, response) => {

  try {
    const url = new URL(request.url, 'http://localhost:3001');

    if (request.method === 'GET' && url.pathname === '/api/videos') {
      const apiRequest = new Request(url, { method: 'GET' });
      const apiResponse = await GET(apiRequest);
      const body = await apiResponse.text();

      response.writeHead(apiResponse.status, {
        'Content-Type': 'application/json; charset=utf-8',
      });
      response.end(body);
      return;
    }
  } catch {
    response.writeHead(500, {
      'Content-Type': 'application/json; charset=utf-8',
    });
    response.end(JSON.stringify({
      error: { message: '로컬 API 처리 실패' },
    }));
    return;
  }

  response.writeHead(404);
  response.end('Not found');
});

server.listen(3001, () => {
  console.log('API 서버: http://localhost:3001');
});
