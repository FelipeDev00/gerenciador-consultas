
package com.gerenciamentoconsulta.gerenciaconsulta.repository;


import com.gerenciamentoconsulta.gerenciaconsulta.model.Consulta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConsultaRepository extends JpaRepository<Consulta, Long> {
}