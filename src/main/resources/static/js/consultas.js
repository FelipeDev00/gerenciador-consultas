document.getElementById("formConsulta").addEventListener("submit", function (e) {
  e.preventDefault();

  const data = document.getElementById("data").value;
  const hora = document.getElementById("hora").value;
  const paciente = document.getElementById("paciente").value;
  const medico = document.getElementById("medico").value;
  const status = document.getElementById("status").value;

  if (!data || !hora || !paciente || !medico || !status) {
    alert("Preencha todos os campos.");
    return;
  }

  const tabela = document.getElementById("tabelaConsultas");
  const linha = tabela.insertRow();

  linha.innerHTML = `
    <td>${data}</td>
    <td>${hora}</td>
    <td>${paciente}</td>
    <td>${medico}</td>
    <td>${status}</td>
  `;

  document.getElementById("formConsulta").reset();
});


