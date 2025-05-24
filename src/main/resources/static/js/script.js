document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formPaciente");
  const tabela = document.getElementById("tabelaPacientes");

  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Evita o recarregamento da página

    const paciente = {
      nome: document.getElementById("nome").value,
      cpf: document.getElementById("cpf").value,
      telefone: document.getElementById("telefone").value,
      dataNascimento: document.getElementById("dataNascimento").value,
      observacoes: document.getElementById("observacoes").value
    };

    try {
      const response = await fetch("http://localhost:8080/api/pacientes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paciente)
      });

      if (response.ok) {
        alert("Paciente cadastrado com sucesso!");
        form.reset();
        carregarPacientes(); // Atualiza a tabela
      } else {
        alert("Erro ao cadastrar paciente.");
      }
    } catch (error) {
      alert("Erro ao conectar com o servidor.");
      console.error(error);
    }
  });

  async function carregarPacientes() {
    try {
      const response = await fetch("http://localhost:8080/api/pacientes");
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

  // Carrega pacientes ao abrir a página
  carregarPacientes();
  
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

      // Ao clicar em "Cadastrar", ele atualiza o paciente ao invés de criar novo
      form.onsubmit = async (event) => {
        event.preventDefault();

        const pacienteAtualizado = {
          nome: document.getElementById("nome").value,
          cpf: document.getElementById("cpf").value,
          telefone: document.getElementById("telefone").value,
          dataNascimento: document.getElementById("dataNascimento").value,
          observacoes: document.getElementById("observacoes").value
        };

        try {
          const updateResponse = await fetch(`http://localhost:8080/api/pacientes/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(pacienteAtualizado)
          });

          if (updateResponse.ok) {
            alert("Paciente atualizado com sucesso!");
            form.reset();
            carregarPacientes();
            // Volta o comportamento padrão do submit
            form.onsubmit = defaultSubmit;
          } else {
            alert("Erro ao atualizar paciente.");
          }
        } catch (error) {
          alert("Erro ao conectar com o servidor.");
          console.error(error);
        }
      };
    }
  } catch (error) {
    console.error("Erro ao carregar paciente:", error);
  }
};

const defaultSubmit = form.onsubmit;

});
