import React from 'react';
import TarefaListar from './components/pages/tarefas-listar';
import TarefaListarNaoConcluidos from './components/pages/tarefas-listar-nao-concluidas';
import TarefaListarConcluidos from './components/pages/tarefas-listar-concluidas';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import TarefaCadastrar from './components/pages/tarefas-cadastrar';

function App() {
  return (
    <div>
      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/tarefas/listar">Listar Tarefas</Link>
            </li>
            <li>
              <Link to="/tarefas/cadastrar">Cadastrar Tarefa</Link>
            </li>
            <li>
              <Link to="/tarefas/listar-nao-concluidas">Listar Tarefas Não Finalizadas</Link>
            </li>
            <li>
              <Link to="/tarefas/listar-concluidas">Listar Tarefas Concluidas</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<TarefaListar />} />
          <Route path="/tarefas/listar" element={<TarefaListar />} />
          <Route path="/tarefas/cadastrar" element={<TarefaCadastrar />} />
          <Route path="/tarefas/listar-nao-concluidas" element={<TarefaListarNaoConcluidos />} />
          <Route path="/tarefas/listar-concluidas" element={<TarefaListarConcluidos />} />
        </Routes>
        <footer>
          <p>André Lucas</p>
        </footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
