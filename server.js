const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

//cria um banco de dados SQLite em memoria
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('lista-tarefa.db');

//cria a tabela 'tarefas' no bando de dados
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXIST tarefas (id INTEGER PRIMARY KEY, tarefa TEXT)")
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
