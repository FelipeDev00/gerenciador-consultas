document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formConsulta");
  const tabela = document.getElementById("tabelaConsultas");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const consulta = {
      data: document.getElementById("data").value,
      hora: document.getElementById("hora").value,
      paciente: document.getElementById("paciente").value,
      medico: document.getElementById("medico").value,
      status: document.getElementById("status").value,
    };

    fetch("http://localhost:8080/api/consultas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(consulta),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao cadastrar consulta");
        }
        alert("Consulta cadastrada com sucesso!");
        form.reset();
        carregarConsultasAgendadas(); // Atualiza tabela após cadastrar
      })
      .catch((error) => {
        console.error(error);
        alert("Erro ao cadastrar consulta.");
      });
  });

  async function carregarConsultasAgendadas() {
    try {
      const response = await fetch("http://localhost:8080/api/consultas");
      const consultas = await response.json();

      // Filtra só as consultas com status "agendada" (case-insensitive)
      const consultasAgendadas = consultas.filter(
        (c) => c.status.toLowerCase() === "agendada"
      );

      tabela.innerHTML = "";

      consultasAgendadas.forEach((c) => {
        const linha = document.createElement("tr");
        linha.innerHTML = `
          <td>${c.data}</td>
          <td>${c.hora}</td>
          <td>${c.paciente}</td>
          <td>${c.medico}</td>
          <td>${c.status}</td>
        `;
        tabela.appendChild(linha);
      });
    } catch (error) {
      console.error("Erro ao carregar consultas:", error);
    }
  }

  // Carrega as consultas agendadas assim que a página abrir
  carregarConsultasAgendadas();
});
