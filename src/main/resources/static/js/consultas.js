document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formConsulta");
  const tabela = document.getElementById("tabelaConsultas");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Evita o envio do formulário

    // Captura os valores dos campos
    const data = document.getElementById("data").value;
    const hora = document.getElementById("hora").value;
    const paciente = document.getElementById("paciente").value;
    const medico = document.getElementById("medico").value;
    const status = document.getElementById("status").value;

    // Cria uma nova linha e colunas com os dados
    const novaLinha = document.createElement("tr");

    novaLinha.innerHTML = `
      <td>${data}</td>
      <td>${hora}</td>
      <td>${paciente}</td>
      <td>${medico}</td>
      <td>${status}</td>
    `;

    // Adiciona a nova linha à tabela
    tabela.appendChild(novaLinha);

    // Limpa o formulário
    form.reset();
  });
});
