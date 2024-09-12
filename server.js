const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

//cria um banco de dados SQLite em memoria
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('lista-tarefa.db');

//cria a tabela 'tarefas' no bando de dados
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS tarefas (id INTEGER PRIMARY KEY, tarefa TEXT)")
})

//rota para adicionar novas tarefas
app.post('/tarefas', (req, res) => {
    const { tarefa } = req.body;
    db.run("INSERT INTO tarefas (tarefa) VALUES (?)", [tarefa], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID, tarefa });
    });
});

//rota para listar todas as tarefas
app.get('/tarefas', (req, res) => {
    db.all("SELECT * FROM tarefas", [], (err, rows) => {
        if (err) {
            return res.status(500).json({error: err.message});
        }
        res.status(200).json(rows);
    });
});

//rota para buscar tarefa especifica
app.get('/tarefas/:id', (req, res) => {
    const { id } = req.params;
    db.get("SELECT * FROM tarefas WHERE id = ?", [id], (err, row) => {
        if (err) {
            return res.status(500).json({error:err.message});
        }
        if (row) {
            res.status(200).json(row);
        } else {
            res.status(404).json({error: 'Esta tarefa não existe!'});
        }
    });
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
