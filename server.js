const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const INMET_URL = 'https://apiprevmet3.inmet.gov.br/avisos/ativos';
const normalize = value => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();

async function getAlerts(url, response) {
  const city = normalize(url.searchParams.get('city'));
  const state = normalize(url.searchParams.get('state'));
  try {
    const apiResponse = await fetch(INMET_URL, { headers: { Accept: 'application/json', 'User-Agent': 'ClimaAgora/1.0' } });
    if (!apiResponse.ok) throw new Error();
    const payload = await apiResponse.json();
    const place = `${city} - ${state}`;
    const alerts = Object.values(payload).flat().filter(item => item && normalize(item.municipios).includes(place)).map(item => ({
      id: item.id, event: item.descricao, severity: item.severidade, color: item.aviso_cor,
      startsAt: item.inicio, endsAt: item.fim, risks: item.riscos || [],
      instructions: item.instrucoes || [], link: `https://avisos.inmet.gov.br/${item.id}`
    }));
    response.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'public, max-age=300' });
    response.end(JSON.stringify({ alerts, source: 'INMET — Instituto Nacional de Meteorologia' }));
  } catch {
    response.writeHead(503, { 'Content-Type': 'application/json; charset=utf-8' });
    response.end(JSON.stringify({ alerts: [], unavailable: true }));
  }
}

http.createServer(async (request, response) => {
  const url = new URL(request.url, `http://localhost:${PORT}`);
  if (url.pathname === '/api/official-alerts') return getAlerts(url, response);
  const file = path.join(__dirname, 'index.html');
  fs.readFile(file, (error, content) => {
    if (error) { response.writeHead(500); response.end('Não foi possível abrir o aplicativo.'); return; }
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    response.end(content);
  });
}).listen(PORT, () => console.log(`Clima Agora aberto em http://localhost:${PORT}`));
