// server.js
const fastify = require('fastify')({ logger: true });
const { Client } = require('pg');

// Configuração do banco de dados PostgreSQL
const client = new Client({
  user: 'neondb_owner',
  host: 'localhost',
  database: 'neondb',
  password: 'npg_KzJnQI84tghT',
  port: 5432,
});

// Conectar ao banco de dados
client.connect()
  .then(() => fastify.log.info('Banco de dados conectado com sucesso!'))
  .catch((err) => fastify.log.error('Erro ao conectar ao banco de dados:', err));

// Definindo uma rota simples
fastify.get('/', async (request, reply) => {
  return { message: 'Olá, Mundo!' };
});

// Definindo uma rota para testar o banco de dados
fastify.get('/usuarios', async (request, reply) => {
  try {
    const res = await client.query('SELECT * FROM usuarios');
    return res.rows;
  } catch (err) {
    fastify.log.error(err);
    return reply.status(500).send({ error: 'Erro ao consultar banco de dados' });
  }
});

// Iniciar o servidor
fastify.listen(3000, '0.0.0.0', (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`Servidor rodando em ${address}`);
});
