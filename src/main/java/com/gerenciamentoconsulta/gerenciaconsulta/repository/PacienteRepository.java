package com.gerenciamentoconsulta.gerenciaconsulta.repository;

import com.gerenciamentoconsulta.gerenciaconsulta.model.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PacienteRepository extends JpaRepository<Paciente, Long> {
}
