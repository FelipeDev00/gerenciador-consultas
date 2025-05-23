/// Simulação de dados fixos de consultas
const consultas = [
  { data: '2025-05-22', hora: '10:00', paciente: 'João Silva', medico: 'Dra. Ana', status: 'agendada' },
  { data: '2025-05-23', hora: '14:00', paciente: 'Maria Lima', medico: 'Dr. Pedro', status: 'concluída' },
  { data: '2025-05-22', hora: '11:30', paciente: 'Carlos Souza', medico: 'Dra. Ana', status: 'cancelada' }
];

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
// Inicializa com todas as consultas
aplicarFiltro();



