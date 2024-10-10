import express from 'express';
import { insertMetadata } from './controler/databaseDados/databaseDados.js';
import cors from 'cors';
import pkg from '@prisma/client';
const { prisma } = pkg;

const app = express();
app.use(express.json());
app.use(cors());

//adiciona na base ======================================
app.post('/metadata', async (req, res) => {
    try {
        await insertMetadata(req.body);
        res.status(201).json({ message: 'Metadados criados com sucesso!' });
    } catch (error) {
        console.error('Erro ao criar metadados:', error);
        res.status(500).json({ message: 'Erro ao criar metadados.' });
    }
});

//consulta todos os dados  ======================================
app.get('/metadata', async (req, res) => {
    const metadatas = await prisma.findMany();
    console.log(metadatas)
    res.status(200).json(metadatas);
});

//consulta por chave latitude e longitude ======================================
app.get('/metadata', async (req, res) => {
    try {
      const metadatas = await prisma.metadata.findMany();
      res.status(200).json(metadatas);
    } catch (error) {
      console.error('Erro ao buscar metadados:', error);
      res.status(500).json({ message: 'Erro ao buscar metadados.' });
    }
  });



  
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



app.listen(3000, () => {
    console.log('Listen on port 3000');
});