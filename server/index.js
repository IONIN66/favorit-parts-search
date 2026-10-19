import { createServer } from 'node:http';
import { request as httpRequest } from 'node:http';
import { loadEnvFile } from 'node:process';

try {
  loadEnvFile('.env');
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}

const PORT = Number(process.env.PORT || 3001);
const API_KEY = process.env.FAVORIT_API_KEY;
const API_URL = process.env.FAVORIT_API_URL || 'http://api.favorit-parts.ru/hs/hsprice/';

const sendJson = (response, status, payload) => {
  response.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  response.end(JSON.stringify(payload));
};

const fetchParts = (parameters) =>
  new Promise((resolvePromise, rejectPromise) => {
    const upstreamUrl = new URL(API_URL);
    upstreamUrl.search = parameters.toString();
    const upstreamRequest = httpRequest(upstreamUrl, { timeout: 10000 }, (upstreamResponse) => {
      let responseText = '';
      upstreamResponse.setEncoding('utf8');
      upstreamResponse.on('data', (chunk) => {
        responseText += chunk;
      });
      upstreamResponse.on('end', () => {
        if (upstreamResponse.statusCode < 200 || upstreamResponse.statusCode >= 300) {
          rejectPromise(new Error(`Сервис вернул HTTP ${upstreamResponse.statusCode}.`));
          return;
        }
        try {
          resolvePromise(JSON.parse(responseText));
        } catch {
          rejectPromise(new Error('Сервис вернул некорректный ответ.'));
        }
      });
    });
    upstreamRequest.on('timeout', () =>
      upstreamRequest.destroy(new Error('Время ожидания сервиса истекло.')),
    );
    upstreamRequest.on('error', rejectPromise);
    upstreamRequest.end();
  });

createServer(async (request, response) => {
  const requestUrl = new URL(request.url, 'http://localhost');
  if (requestUrl.pathname !== '/api/parts') {
    sendJson(response, 404, { error: 'Маршрут не найден.' });
    return;
  }
  if (request.method !== 'GET') {
    sendJson(response, 405, { error: 'Метод не поддерживается.' });
    return;
  }
  const number = requestUrl.searchParams.get('number')?.trim();
  const brand = requestUrl.searchParams.get('brand')?.trim();
  if (!number || number.length > 100 || (brand && brand.length > 100)) {
    sendJson(response, 400, { error: 'Укажите корректный артикул и производителя.' });
    return;
  }
  if (!API_KEY || API_KEY === 'your-customer-key') {
    sendJson(response, 503, {
      error:
        'Укажите действующий ключ покупателя FAVORIT_API_KEY в .env и перезапустите API-сервер.',
    });
    return;
  }
  const parameters = new URLSearchParams({ key: API_KEY, number });
  if (brand) {
    parameters.set('brand', brand);
    parameters.set('analogues', 'on');
  }
  try {
    const payload = await fetchParts(parameters);
    sendJson(response, 200, payload);
  } catch (error) {
    sendJson(response, 502, { error: error.message || 'Сервис временно недоступен.' });
  }
}).listen(PORT, () => {
  console.log(`Прокси API запущен на http://localhost:${PORT}`);
});
