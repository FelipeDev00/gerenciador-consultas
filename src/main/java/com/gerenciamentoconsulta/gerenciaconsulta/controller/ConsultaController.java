
package com.gerenciamentoconsulta.gerenciaconsulta.controller;

import com.gerenciamentoconsulta.gerenciaconsulta.model.Consulta;
import com.gerenciamentoconsulta.gerenciaconsulta.repository.ConsultaRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/consultas")
@CrossOrigin(origins = "*") // Permite o acesso do front-end
public class ConsultaController {

    private final ConsultaRepository repository;

    public ConsultaController(ConsultaRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Consulta> listar() {
        return repository.findAll();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Consulta> buscarPorId(@PathVariable Long id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
}

    @PostMapping
    public Consulta salvar(@RequestBody Consulta consulta) {
        return repository.save(consulta);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Consulta> atualizar(@PathVariable Long id, @RequestBody Consulta novaConsulta) {
        return repository.findById(id)
                .map(consultaExistente -> {
                    consultaExistente.setData(novaConsulta.getData());
                    consultaExistente.setHora(novaConsulta.getHora());
                    consultaExistente.setPaciente(novaConsulta.getPaciente());
                    consultaExistente.setMedico(novaConsulta.getMedico());
                    consultaExistente.setStatus(novaConsulta.getStatus());
                    Consulta atualizada = repository.save(consultaExistente);
                    return ResponseEntity.ok(atualizada);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    
    @DeleteMapping("/{id}")
public ResponseEntity<Void> excluir(@PathVariable Long id) {
    if (repository.existsById(id)) {
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
    return ResponseEntity.notFound().build();
}

}
