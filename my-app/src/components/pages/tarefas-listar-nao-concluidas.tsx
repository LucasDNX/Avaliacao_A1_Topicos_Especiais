import { useEffect, useState } from "react";
import { Tarefa } from "../../models/Tarefa";

function TarefaListarNaoConcluidos() {
    const [tarefas, setTarefas] = useState<Tarefa[]>([]);

    useEffect(() => {
      carregarTarefa();
    }, []);
  
    function carregarTarefa() {
      fetch("http://localhost:5000/tarefas/listar-nao-concluidas")
        .then((resposta) => resposta.json())
        .then((tarefas: Tarefa[]) => {
          setTarefas(tarefas);
          console.table(tarefas);
        })
        .catch((erro) => {
          console.log("Deu ruim meu nobre!");
        });
    }
  
    return (
      <div>
        <h1>Listar Produtos</h1>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Nome</th>
              <th>Desrição</th>
              <th>Preço</th>
              <th>Quantidade</th>
              <th>Criado Em</th>
            </tr>
          </thead>
          <tbody>
            {tarefas.map((tarefa) => (
              <tr key={tarefa.tarefaId}>
                <td>{tarefa.tarefaId}</td>
                <td>{tarefa.titulo}</td>
                <td>{tarefa.descricao}</td>
                <td>{tarefa.criadoEm}</td>
                <td>{tarefa.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  export default TarefaListarNaoConcluidos;