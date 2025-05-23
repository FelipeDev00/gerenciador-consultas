document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formConsulta");
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
      })
      .catch((error) => {
        console.error(error);
        alert("Erro ao cadastrar consulta.");
      });
  });
});
