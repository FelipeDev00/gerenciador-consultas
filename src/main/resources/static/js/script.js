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
        `;
        tabela.appendChild(linha);
      });
    } catch (error) {
      console.error("Erro ao carregar pacientes:", error);
    }
  }

  // Carrega pacientes ao abrir a página
  carregarPacientes();
});
