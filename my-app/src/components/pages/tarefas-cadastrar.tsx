import { useEffect, useState } from "react";
import { Tarefa } from "../../models/Tarefa";
import { useNavigate } from "react-router-dom";
import { Categoria } from "../../models/Categoria";

function TarefaCadastrar() {
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    carregarCategorias();
  }, []);

  function carregarCategorias() {
    fetch("http://localhost:5000/categoria/listar")
      .then((resposta) => resposta.json())
      .then((categorias: Categoria[]) => {
        setCategorias(categorias);
      }).catch((erro) => {
        console.log("Erro ao carregar categorias!");
      });
  }

  function cadastrarTarefa(e: any) {
    e.preventDefault();
    const tarefa: Tarefa = {
      tarefaId: "",
      titulo: titulo,
      descricao: descricao,
      categoriaId: categoriaId,
      status: "Não iniciada"
    };

    //FETCH ou AXIOS
    fetch("http://localhost:5000/tarefas/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tarefa),
    })
      .then((resposta) => resposta.json())
      .then((TarefaCadastrado: Tarefa) => {
        console.log(TarefaCadastrado);
      });
  }
  return (
    <div>
      <h1>Cadastrar Tarefa</h1>
      <form onSubmit={cadastrarTarefa}>
        <label>Tirulo:</label>
        <input
          type="text"
          placeholder="Digite o Tirulo"
          onChange={(e: any) => setTitulo(e.target.value)}
          required
        />
        <br />
        <label>Descricao:</label>
        <input
          type="text"
          placeholder="Digite o descrição"
          onChange={(e: any) => setDescricao(e.target.value)}
        />
        <br />
        <label>Categorias:</label>
        <select onChange={(e: any) => setCategoriaId(e.target.value)}>
          {categorias.map((categoria) => (
            <option value={categoria.id} key={categoria.id}>
              {categoria.nome}
            </option>
          ))}
        </select>
        <br />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default TarefaCadastrar;