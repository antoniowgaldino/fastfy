// test/usuarios.test.js
const fastify = require('fastify');
const { Client } = require('pg');

// Inicializar Fastify
const app = fastify();

// Configuração do banco de dados PostgreSQL (mesma do servidor)
const client = new Client({
    user: 'neondb_owner',
    host: 'localhost',
    database: 'neondb',
    password: 'npg_KzJnQI84tghT',
    port: 5432,
});

// Conectar ao banco de dados
client.connect();

// Definindo rota /usuarios
app.get('/usuarios', async (request, reply) => {
    try {
        const res = await client.query('SELECT * FROM usuarios');
        return res.rows;
    } catch (err) {
        return reply.status(500).send({ error: 'Erro ao consultar banco de dados' });
    }
});

describe('Testando a API de Usuários', () => {
    it('Deve retornar todos os usuários', async () => {
        const response = await app.inject({
            method: 'GET',
            url: '/usuarios'
        });

        expect(response.statusCode).toBe(200);
        const usuarios = JSON.parse(response.payload);
        expect(usuarios.length).toBeGreaterThan(0);
        expect(usuarios[0]).toHaveProperty('id');
        expect(usuarios[0]).toHaveProperty('nome');
        expect(usuarios[0]).toHaveProperty('email');
    });
});

afterAll(() => {
    client.end();
});
