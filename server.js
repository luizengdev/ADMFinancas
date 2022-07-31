const express = require("express");
const app = express();
app.use(express.json());
app.use("/", express.static("./client"));

const lancamentos = [
    { mes: "janeiro", categoria: "Salário", tipo: "receita", valor: 5000},
    { mes: "janeiro", categoria: "Aluguel", tipo: "despesa", valor: 1000},
    { mes: "janeiro", categoria: "Conta de Luz", tipo: "despesa", valor: 200},
    { mes: "janeiro", categoria: "Conta de Água", tipo: "despesa", valor: 100},
    { mes: "janeiro", categoria: "Internet", tipo: "despesa", valor: 100},
    { mes: "janeiro", categoria: "Alimentação", tipo: "despesa", valor: 500},
    { mes: "janeiro", categoria: "Condominio", tipo: "despesa", valor: 300},
    { mes: "fevereiro", categoria: "Salário", tipo: "receita", valor: 5000},
    { mes: "fevereiro", categoria: "Aluguel", tipo: "despesa", valor: 1200},
    { mes: "fevereiro", categoria: "Conta de Luz", tipo: "despesa", valor: 250},
    { mes: "fevereiro", categoria: "Conta de Água", tipo: "despesa", valor: 100},
    { mes: "fevereiro", categoria: "Internet", tipo: "despesa", valor: 100},
    { mes: "fevereiro", categoria: "Alimentação", tipo: "despesa", valor: 1000},
    { mes: "marco", categoria: "Salário", tipo: "receita", valor: 4000},
    { mes: "marco", categoria: "Aluguel", tipo: "despesa", valor: 1200},
    { mes: "marco", categoria: "Conta de Luz", tipo: "despesa", valor: 200},
    { mes: "marco", categoria: "Conta de Água", tipo: "despesa", valor: 100},
    { mes: "marco", categoria: "Internet", tipo: "despesa", valor: 200},
    { mes: "marco", categoria: "Alimentação", tipo: "despesa", valor: 1000},
    { mes: "marco", categoria: "Condominio", tipo: "despesa", valor: 400},
    { mes: "abril", categoria: "Salário", tipo: "receita", valor: 4000},
    { mes: "abril", categoria: "Aluguel", tipo: "despesa", valor: 1200},
    { mes: "abril", categoria: "Conta de Luz", tipo: "despesa", valor: 200},
    { mes: "abril", categoria: "Conta de Água", tipo: "despesa", valor: 100},
    { mes: "abril", categoria: "Internet", tipo: "despesa", valor: 200},
    { mes: "abril", categoria: "Alimentação", tipo: "despesa", valor: 1000},
    { mes: "abril", categoria: "Condominio", tipo: "despesa", valor: 400}
];

app.get("/api/lancamentos", function (req, res) {
   res.json(lancamentos);
});

app.post("/api/lancamentos", function (req, res) {
    const lancamento = req.body;
    lancamentos.push(lancamento);
    res.end();
 });

app.listen(3000);