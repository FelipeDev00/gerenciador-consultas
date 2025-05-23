document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const consultaId = params.get("id");

  if (!consultaId) {
    alert("ID da consulta não informado.");
    window.location.href = "lista-consultas.html";
    return;
  }

  // Carrega os dados da consulta
  fetch(`http://localhost:8080/api/consultas/${consultaId}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Consulta não encontrada");
      }
      return res.json();
    })
    .then((consulta) => {
      document.getElementById("data").value = consulta.data;
      document.getElementById("hora").value = consulta.hora;
      document.getElementById("paciente").value = consulta.paciente;
      document.getElementById("medico").value = consulta.medico;
      document.getElementById("status").value = consulta.status;
    })
    .catch((err) => {
      console.error("Erro ao carregar consulta:", err);
      alert("Erro ao carregar consulta.");
      window.location.href = "lista-consultas.html";
    });

  // Atualiza a consulta
  document.getElementById("formEditarConsulta").addEventListener("submit", function (e) {
    e.preventDefault();

    const consultaAtualizada = {
      data: document.getElementById("data").value,
      hora: document.getElementById("hora").value,
      paciente: document.getElementById("paciente").value,
      medico: document.getElementById("medico").value,
      status: document.getElementById("status").value,
    };
console.log("Enviando PUT com dados:", consultaAtualizada);

    fetch(`http://localhost:8080/api/consultas/${consultaId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(consultaAtualizada),
    })
    
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erro ao atualizar consulta");
        }
        alert("Consulta atualizada com sucesso!");
        window.location.href = "lista-consultas.html";
      })
      .catch((err) => {
        console.error("Erro ao atualizar consulta:", err);
        alert("Erro ao atualizar consulta.");
      });
      console.log("Resposta do servidor:", res);

  });
});
