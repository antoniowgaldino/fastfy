import fastify from 'fastify';
import pkg from 'pg';
const { Client } = pkg;

// Criando o servidor Fastify com logger
const app = fastify({ logger: true });

// Configuração do banco de dados PostgreSQL
const client = new Client({
  user: 'neondb_owner',
  host: 'ep-still-haze-a5ukpqb7-pooler.us-east-2.aws.neon.tech',
  database: 'neondb',
  password: 'npg_KzJnQI84tghT',
  port: 5432,
});

// Conectar ao banco de dados
client.connect()
  .then(() => app.log.info('Banco de dados conectado com sucesso!'))
  .catch((err) => app.log.error('Erro ao conectar ao banco de dados:', err));

// Definindo uma rota simples
app.get('/', async (request, reply) => {
  return { message: 'Olá, Mundo!' };
});

// Definindo uma rota para testar o banco de dados
app.get('/pasteis', async (request, reply) => {
  try {
    const res = await client.query('SELECT * FROM pasteis');
    return res.rows;
  } catch (err) {
    app.log.error(err);
    return reply.status(500).send({ error: 'Erro ao consultar banco de dados' });
  }
});

// Iniciar o servidor
app.listen({ port: 3000 }, (err) => {
  if (err) {
    app.log.error('Erro ao iniciar o servidor:', err);
    process.exit(1);
  }
  app.log.info(`Servidor rodando em http://localhost:3000`);
});
