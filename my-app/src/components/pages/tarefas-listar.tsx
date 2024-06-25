import { useEffect, useState } from "react";
import { Tarefa } from "../../models/Tarefa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function TarefaListar() {
    const navigate = useNavigate();
    const [tarefas, setTarefas] = useState<Tarefa[]>([]);

    useEffect(() => {
      CarregarTarefa();
    }, []);
  
    function CarregarTarefa() {
      fetch("http://localhost:5000/tarefas/listar")
        .then((resposta) => resposta.json())
        .then((tarefas: Tarefa[]) => {
          setTarefas(tarefas);
          console.table(tarefas);
        })
        .catch((erro) => {
          console.log("Deu ruim meu nobre!");
        });
    }
  
    function Atualizar(id: string){
      axios.put<Tarefa>(`http://localhost:5000/tarefas/alterar/${id}`)
      .then((produtoAlterado) => {
        navigate("/tarefas/listar");
      });
    }
  
    return (
      <div>
        <h1>Listar Produtos</h1>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Titulo</th>
              <th>Desrição</th>
              <th>Criado em:</th>
              <th>Status</th>
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
                <td>
                  <button onClick={() => Atualizar(tarefa.tarefaId!)}>
                    Alterar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  export default TarefaListar;