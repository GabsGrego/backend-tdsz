const express = require('express');
const router = express.Router();
const tarefaController = require('../controllers/tarefaController');
const authMiddleware = require('../middlewares/authMiddleware'); //Importa o middleware

// Rota para criar nova tarefa
router.post('/',authMiddleware, tarefaController.createTarefa);

// Rota para listar todas as tarefas
router.get('/',authMiddleware, tarefaController.getTarefas);

// Rota para obter uma tarefa específica
router.get('/:id',authMiddleware, tarefaController.getTarefaById);

// Rota para atualizar uma tarefa
router.put('/:id',authMiddleware, tarefaController.updateTarefa);

// Rota para deletar uma tarefa
router.delete('/:id',authMiddleware, tarefaController.deleteTarefa);

module.exports = router;