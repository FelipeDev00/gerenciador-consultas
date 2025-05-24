document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formPaciente");
  const tabela = document.getElementById("tabelaPacientes");
  const btnCadastrar = document.getElementById("btnCadastrar");
  const btnAtualizar = document.getElementById("btnAtualizar");

  let idPacienteEditando = null;

  btnCadastrar.addEventListener("click", async (event) => {
    event.preventDefault();

    const paciente = coletarDadosFormulario();

    try {
      const response = await fetch("http://localhost:8080/api/pacientes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paciente)
      });

      if (response.ok) {
        alert("Paciente cadastrado com sucesso!");
        form.reset();
        carregarPacientes();
      } else {
        alert("Erro ao cadastrar paciente.");
      }
    } catch (error) {
      alert("Erro ao conectar com o servidor.");
      console.error(error);
    }
  });

  btnAtualizar.addEventListener("click", async () => {
    const pacienteAtualizado = coletarDadosFormulario();

    try {
      const response = await fetch(`http://localhost:8080/api/pacientes/${idPacienteEditando}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pacienteAtualizado)
      });

      if (response.ok) {
        alert("Paciente atualizado com sucesso!");
        form.reset();
        carregarPacientes();
        alternarModo("cadastrar");
      } else {
        alert("Erro ao atualizar paciente.");
      }
    } catch (error) {
      alert("Erro ao conectar com o servidor.");
      console.error(error);
    }
  });

  function coletarDadosFormulario() {
    return {
      nome: document.getElementById("nome").value,
      cpf: document.getElementById("cpf").value,
      telefone: document.getElementById("telefone").value,
      dataNascimento: document.getElementById("dataNascimento").value,
      observacoes: document.getElementById("observacoes").value
    };
  }

  function alternarModo(modo) {
    if (modo === "editar") {
      btnCadastrar.style.display = "none";
      btnAtualizar.style.display = "inline";
    } else {
      btnCadastrar.style.display = "inline";
      btnAtualizar.style.display = "none";
      idPacienteEditando = null;
    }
  }

  async function carregarPacientes() {
    try {
      const response = await fetch("http://localhost:8080/api/pacientes");
      if (!response.ok) throw new Error("Erro ao buscar pacientes");
      const pacientes = await response.json();
      tabela.innerHTML = "";

      pacientes.forEach((p) => {
        const linha = document.createElement("tr");
        linha.innerHTML = `
          <td>${p.nome}</td>
          <td>${p.cpf}</td>
          <td>${p.telefone}</td>
          <td>${p.dataNascimento}</td>
          <td>${p.observacoes || ""}</td>
          <td>
            <button onclick="editarPaciente(${p.id})">Editar</button>
            <button onclick="excluirPaciente(${p.id})">Excluir</button>
          </td>
        `;
        tabela.appendChild(linha);
      });
    } catch (error) {
      console.error("Erro ao carregar pacientes:", error);
    }
  }

  // Expor funções globalmente para os botões funcionarem
  window.excluirPaciente = async function (id) {
    if (confirm("Tem certeza que deseja excluir este paciente?")) {
      try {
        const response = await fetch(`http://localhost:8080/api/pacientes/${id}`, {
          method: "DELETE"
        });
        if (response.ok) {
          alert("Paciente excluído com sucesso!");
          carregarPacientes();
        } else {
          alert("Erro ao excluir paciente.");
        }
      } catch (error) {
        alert("Erro ao conectar com o servidor.");
        console.error(error);
      }
    }
  };

  window.editarPaciente = async function (id) {
    try {
      const response = await fetch(`http://localhost:8080/api/pacientes`);
      const pacientes = await response.json();
      const paciente = pacientes.find(p => p.id === id);
      if (paciente) {
        document.getElementById("nome").value = paciente.nome;
        document.getElementById("cpf").value = paciente.cpf;
        document.getElementById("telefone").value = paciente.telefone;
        document.getElementById("dataNascimento").value = paciente.dataNascimento;
        document.getElementById("observacoes").value = paciente.observacoes || "";
        idPacienteEditando = id;
        alternarModo("editar");
      }
    } catch (error) {
      console.error("Erro ao carregar paciente para edição:", error);
    }
  };

  // Iniciar carregamento
  carregarPacientes();
});
