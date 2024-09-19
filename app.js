const express = require('express');
const app = express();
const tarefaRoutes = require('./routes/tarefaRoutes');
const userRoutes = require('./routes/userRoutes');
const authMiddleware = require('./middlewares/authMiddleware');

// Middleware para JSON
app.use(express.json());

// Rotas
app.use('/api', userRoutes);

// Rotas protegidas
app.use('/api/tarefas', authMiddleware, tarefaRoutes);

// Exporta o app para ser utilizado no server.js
module.exports = app;