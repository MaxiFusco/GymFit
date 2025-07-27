package com.gymfit.controller;

import com.gymfit.dto.ApiResponse;
import com.gymfit.model.Routine;
import com.gymfit.service.RoutineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/routines")
@CrossOrigin(origins = "http://localhost:8080")
public class RoutineController {
    
    @Autowired
    private RoutineService routineService;
    
    @GetMapping
    public ResponseEntity<ApiResponse<List<Routine>>> getAllRoutines() {
        try {
            List<Routine> routines = routineService.getAllRoutines();
            return ResponseEntity.ok(new ApiResponse<>(true, routines, "Rutinas obtenidas exitosamente"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new ApiResponse<>(false, null, "Error al obtener rutinas: " + e.getMessage()));
        }
    }
    
   @GetMapping("/{id}")
public ResponseEntity<ApiResponse<Routine>> getRoutine(@PathVariable Long id) {
    try {
        Optional<Routine> routineOpt = routineService.getRoutineById(id);
        if (routineOpt.isPresent()) {
            Routine routine = routineOpt.get();
            return ResponseEntity.ok(new ApiResponse<>(true, routine, "Rutina obtenida exitosamente"));
        } else {
            return ResponseEntity.notFound().build();
        }
    } catch (Exception e) {
        return ResponseEntity.badRequest()
            .body(new ApiResponse<>(false, null, "Error al obtener rutina: " + e.getMessage()));
    }
}

    
    @PostMapping
    public ResponseEntity<ApiResponse<Routine>> createRoutine(@RequestBody Routine routine) {
        try {
            Routine savedRoutine = routineService.saveRoutine(routine);
            return ResponseEntity.ok(new ApiResponse<>(true, savedRoutine, "Rutina creada exitosamente"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new ApiResponse<>(false, null, "Error al crear rutina: " + e.getMessage()));
        }
    }
}
