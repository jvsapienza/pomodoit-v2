// server.js
const { createServer } = require('http');
const next = require('next');

const port = process.env.PORT || 3000; // Porta em que a aplicação vai escutar
const app = next({ dev: false });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    handle(req, res);
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Servidor iniciado na porta ${port}`);
  });
});
