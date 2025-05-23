let consultas = [];

function carregarConsultas() {
  fetch("http://localhost:8080/api/consultas")
    .then((res) => res.json())
    .then((data) => {
      consultas = data;
      aplicarFiltro(); // já renderiza ao carregar
    })
    .catch((err) => {
      console.error("Erro ao carregar consultas:", err);
    });
}

function aplicarFiltro() {
  const dataFiltro = document.getElementById("filtroData").value;
  const medicoFiltro = document.getElementById("filtroMedico").value.toLowerCase();

  const corpoTabela = document.getElementById("tabelaConsultasFiltradas");
  corpoTabela.innerHTML = "";

  const resultados = consultas.filter(c => {
    const correspondeData = !dataFiltro || c.data === dataFiltro;
    const correspondeMedico = !medicoFiltro || c.medico.toLowerCase().includes(medicoFiltro);
    return correspondeData && correspondeMedico;
  });

  resultados.forEach(c => {
  const linha = corpoTabela.insertRow();
  linha.innerHTML = `
    <td>${c.data}</td>
    <td>${c.hora}</td>
    <td>${c.paciente}</td>
    <td>${c.medico}</td>
    <td>${c.status}</td>
    <td>
      <button onclick="editarConsulta(${c.id})">Editar</button>
      <button onclick="excluirConsulta(${c.id})">Excluir</button>
    </td>
  `;
});

}

function excluirConsulta(id) {
  if (!confirm("Tem certeza que deseja excluir esta consulta?")) return;

  fetch(`http://localhost:8080/api/consultas/${id}`, {
    method: "DELETE",
  })
  .then(response => {
    if (response.ok) {
      alert("Consulta excluída com sucesso!");
      carregarConsultas(); // Recarrega lista após exclusão
    } else {
      alert("Erro ao excluir consulta.");
    }
  })
  .catch(error => {
    console.error("Erro ao excluir consulta:", error);
    alert("Erro ao excluir consulta.");
  });
}

function editarConsulta(id) {
  // Aqui você pode:
  // 1. Buscar a consulta pelo id (se necessário)
  // 2. Abrir uma modal ou redirecionar para uma página/formulário de edição
  // Por simplicidade, posso te ajudar a criar um formulário modal depois
  alert("Função de editar ainda será implementada para a consulta com id: " + id);
}


document.addEventListener("DOMContentLoaded", carregarConsultas);
