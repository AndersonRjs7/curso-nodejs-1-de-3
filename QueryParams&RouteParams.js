const express = require('express');
// buscando tudo que podemos usar do express

const server = express();

// Query Params = ?nome=NodeJS
// Route Params = /curso/2
// Request Body = {nome: 'NodeJS, tipo: 'Backend'}

// criando uma rota, e acessando localhost:3000/curso
server.get('/curso/:id', (req, res) => {
  // const nome = req.query.nome;
  const id = req.params.id;

  return res.json({curso: `O ID do curso é ${id}`});
});

server.listen(3000);
// faz com que o servidor rode na porta escolhida