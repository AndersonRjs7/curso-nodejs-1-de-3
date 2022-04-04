const express = require('express');
// buscando tudo que podemos usar do express

const server = express();

// Query Params = ?nome=NodeJS
// Route Params = /curso/2
// Request Body = {nome: 'NodeJS, tipo: 'Backend'}


const cursos = ['NodeJs', 'PHP', 'JavaScript', 'React Native'];



// criando uma rota, e acessando localhost:3000/curso
server.get('/curso/:index', (req, res) => {
  // const nome = req.query.nome;
  const {index} = req.params;

  // Pegando a posição do array
  return res.json(cursos[index]);
});

server.listen(3000);
// faz com que o servidor rode na porta escolhida