import express from 'express';
import { insertMetadata } from './controler/databaseDados/databaseDados.js';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

// Inicializa o Prisma Client
const prisma = new PrismaClient();

// Inicializa o servidor Express
const app = express();
app.use(express.json()); // Permite o parsing de JSON no corpo das requisições
app.use(cors()); // Habilita CORS

// Rota para adicionar metadados
app.post('/metadata', async (req, res) => {
    try {
        await insertMetadata(req.body);
        res.status(201).json({ message: 'Metadados criados com sucesso!' });
    } catch (error) {
        console.error('Erro ao criar metadados:', error);
        res.status(500).json({ message: 'Erro ao criar metadados.' });
    }
});

// Função para buscar todos os metadados
async function getAllMetadata() {
    try {
        const metadata = await prisma.metadata.findMany();
        return metadata;
    } catch (error) {
        console.error('Erro ao buscar metadados do banco de dados:', error);
        throw error; 
    }
}

// Rota para buscar todos os metadados
app.get('/metadata', async (req, res) => {
    try {
        const metadata = await getAllMetadata(); 
        res.status(200).json(metadata);
    } catch (error) {
        console.error('Erro ao buscar metadados:', error);
        res.status(500).json({ message: 'Erro ao buscar metadados.' });
    }
});

// Rota para buscar metadados por latitude e longitude (não implementada)
app.get('/metadata', async (req, res) => { 
    try {
        const metadatas = await prisma.metadata.findMany(); // Implementar lógica de busca por latitude e longitude
        res.status(200).json(metadatas);
    } catch (error) {
        console.error('Erro ao buscar metadados:', error);
        res.status(500).json({ message: 'Erro ao buscar metadados.' });
    }
});

// Rota para excluir metadados por ID (não implementada)
app.delete('/metadata/:id', async (req, res) => {
    try {
        await prisma.metadata.delete({
            where: {
                id: parseInt(req.params.id)
            }
        });
        res.status(200).json({ message: 'Metadados excluídos com sucesso!' });
    } catch (error) {
        console.error("Erro ao excluir metadados:", error);
        res.status(500).json({ message: 'Erro ao excluir metadados.' });
    }
});

// Inicia o servidor na porta 3000
app.listen(3000, () => {
    console.log('Listen on port 3000');
});