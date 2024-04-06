//********************************************************************
// Fatec - Zona Sul - Desenvolvimento de Software Multiplataforma
// Diciplina: Desenvolvimento Web III - Prof Vinicius Heltai
// Autor: Paola Precioso, João Previdente, Lucas Gimenes - 04/03/2024
// Descrição: Desenvolvimento de um código de back-end usando 
//Node.js para calcular a média do aluno por meio de requisições 
//HTTP, com o propósito educacional.
//********************************************************************

import * as http from 'http';
import * as url from 'url';
import * as fs from 'fs';
import * as ejs from 'ejs';
import Aluno from './Aluno.js';

const server = http.createServer((req, res) => {
  const reqUrl = url.parse(req.url, true);
  const path = reqUrl.pathname;
  const query = reqUrl.query;

  const alunoAtual = new Aluno();
  alunoAtual.definirNome(query.aluno);
  alunoAtual.definirMateria(query.materia);
  let notas = [];

  if (path === "/mediaAluno") {
    if (isNaN(parseFloat(query.notaP1)) || isNaN(parseFloat(query.notaP2))) {
      res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Preencher as notas com números válidos');
    } else {
      if (query.notaP1 < 0 || query.notaP2 < 0) {
        res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Preencher as notas com números válidos');
      } else {
        notas.push(query.notaP1, query.notaP2);
        for (let i = 0;  i < notas.length; i++)
          alunoAtual.adicionarNota(alunoAtual.materia, notas[i]);
      }

      let resultado = alunoAtual.calcularMediaAluno(notas);
      
      if (resultado === 'aprovado') {
        fs.readFile('aprovado.ejs', 'utf-8', (err, data) => {
          if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end(err);
          } else {
            const html = ejs.render(data, { aluno: alunoAtual.nome, materia: alunoAtual.materia, notas });
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(html);
          }
        });
      } else {
        fs.readFile('reprovado.ejs', 'utf-8', (err, data) => {
          if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end(err);
          } else {
            const html = ejs.render(data, { aluno: alunoAtual.nome, materia: alunoAtual.materia, notas });
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(html);
          }
        });
      }
    }
  } else {

    fs.readFile('error404.html', 'utf-8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(err);
      } else {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(data);
      }
    }); 
  }
});

const PORT = 3000; 

server.listen(PORT, () => {
  console.log(`Servidor iniciado em http://localhost:${PORT}`);
});
