const express = require('express');
const cors = require('cors'); // Importa o CORS
const app = express();
const tarefaRoutes = require('./routes/tarefaRoutes');
const userRoutes = require('./routes/userRoutes');
const authMiddleware = require('./middlewares/authMiddleware');

// Middleware para JSON
app.use(express.json());

// Inicializa o CORS
app.use(cors()); // Aqui é onde você deve inicializar o CORS

// Rotas
app.use('/api', userRoutes); // Rota para autenticação

// Rotas protegidas
app.use('/api/tarefas', authMiddleware, tarefaRoutes);

// Exporta o app para ser utilizado no server.js
module.exports = app;