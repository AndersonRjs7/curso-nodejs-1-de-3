const express = require('express');
// buscando tudo que podemos usar do express

const server = express();

server.use(express.json());

// Query Params = ?nome=NodeJS
// Route Params = /curso/2
// Request Body = {nome: 'NodeJS, tipo: 'Backend'}


// CRUD > Create, Read, Updade, Delete

const cursos = ['NodeJs', 'PHP', 'Java', 'React Native'];

// Middlewares global, idependente de rota
server.use((req, res, next) =>{
  console.log(`URL CHAMADA ${req.url}`);

  return next();
  // Seguindo o fluxo da requisição
})

// Verificando se o campo name estar vazio
function checkCurso(req, res, next) {
  if(!req.body.name){
    return res.status(400).json({error: "Nome do curso é obrigatório!"})
  }

  return next();
}

// Verificando se o campo name estar vazio
function checkIndexCurso(req, res, next) {
  const curso = cursos[req.params.index];
  // Veficando se tem esse index


  if(!curso){
    return res.status(400).json({error: "Curso não existe!"})
  }

  req.curso = curso;

  return next();
}



// Lendo dados "Read", listando um único curso
server.get('/cursos', (req, res)=>{
  return res.json(cursos);
});



// criando uma rota, e acessando localhost:3000/curso
server.get('/cursos/:index',  checkIndexCurso, (req, res) => {
  // const nome = req.query.nome;
  // const {index} = req.params;

  // Pegando a posição do array
  return res.json(req.curso);
});


// Criando um novo curso "Create"
server.post('/cursos', checkCurso, checkIndexCurso, (req, res)=>{
   const {name} = req.body; // Aguardando uma requisição

   // Enviando um dado
   cursos.push(name);

   // Retornado ao front-end
   return res.json(cursos);
});


// Atualizando um Curso
server.put('/cursos/:index', checkCurso, checkIndexCurso, (req, res)=>{
  const {index} = req.params;
  // Pegando o index(posição)

  // Pegando o nome do curso para ser alterado
  const {name} = req.body;

  // Entrando no cursos e atualizando informação
  cursos[index] = name;

  // Retornado ao front-end todos os cursos que estão atualizados
  return res.json(cursos);

})


// Deletando um curso existente
server.delete('/cursos/:index', checkIndexCurso, (req, res)=>{
  const {index} = req.params;
  // Pegando o index(posição)

  // Deletando um curso
  cursos.splice(index, 1);
  return res.json({message: "Curso deletado!"});

  // Retornado ao front-end todos os cursos que estão atualizados
  return res.json(cursos);
})



// O que são Middlewares? É todo tipo de função que estar
// entre o pedido da requisição entre a resposta final para o front-end.



server.listen(3000);
// faz com que o servidor rode na porta escolhida