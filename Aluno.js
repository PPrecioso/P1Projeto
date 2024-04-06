//********************************************************************
// Fatec - Zona Sul - Desenvolvimento de Software Multiplataforma
// Diciplina: Desenvolvimento Web III - Prof Vinicius Heltai
// Autor: Paola Precioso, João Previdente, Lucas Gimenes - 04/03/2024
// Descrição: Desenvolvimento de um código de back-end usando 
//Node.js para calcular a média do aluno por meio de requisições 
//HTTP, com o propósito educacional.
//********************************************************************

export default class Aluno {
  constructor() {
    if (!Aluno.instancia) {
      this.nome = "";
      this.notas = {};
      this.materia = "";
      Aluno.instancia = this;
    }

    return Aluno.instancia;
  }

  definirNome(nome) {
    this.nome = nome;
  }

  definirMateria(materia) {
    this.materia = materia;
  }

  adicionarNota(disciplina, nota) {
    this.notas[disciplina] = nota;
  }

  calcularMediaAluno(notas) {
    const media = (notas.reduce((acc, nota) => acc + parseFloat(nota), 0) / notas.length).toFixed(1);
    return media >= 6.0 ? 'aprovado' : 'reprovado';
  }
}

