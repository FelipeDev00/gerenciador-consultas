package com.gerenciamentoconsulta.gerenciaconsulta.controller;

import com.gerenciamentoconsulta.gerenciaconsulta.model.Paciente;
import com.gerenciamentoconsulta.gerenciaconsulta.repository.PacienteRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pacientes")
@CrossOrigin(origins = "*")
public class PacienteController {

    private final PacienteRepository repository;

    public PacienteController(PacienteRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Paciente> listar() {
        return repository.findAll();
    }

    @PostMapping
    public Paciente salvar(@RequestBody Paciente paciente) {
        return repository.save(paciente);
    }
}
