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
    `;
  });
}

document.addEventListener("DOMContentLoaded", carregarConsultas);
