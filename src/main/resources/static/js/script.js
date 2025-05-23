document.getElementById("formPaciente").addEventListener("submit", function (e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const cpf = document.getElementById("cpf").value;
  const telefone = document.getElementById("telefone").value;
  const dataNascimento = document.getElementById("dataNascimento").value;
  const observacoes = document.getElementById("observacoes").value;

  // Validação simples
  if (!nome || !cpf || !telefone || !dataNascimento) {
    alert("Por favor, preencha todos os campos obrigatórios.");
    return;
  }

  const tabela = document.getElementById("tabelaPacientes");
  const linha = tabela.insertRow();

  linha.innerHTML = `
    <td>${nome}</td>
    <td>${cpf}</td>
    <td>${telefone}</td>
    <td>${dataNascimento}</td>
    <td>${observacoes}</td>
  `;

  // Limpa o formulário
  document.getElementById("formPaciente").reset();
});
