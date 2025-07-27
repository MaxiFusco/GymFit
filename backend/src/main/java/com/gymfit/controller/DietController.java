package com.gymfit.controller;

import com.gymfit.dto.ApiResponse;
import com.gymfit.model.Diet;
import com.gymfit.service.DietService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/diets")
@CrossOrigin(origins = "http://localhost:8080")
public class DietController {
    
    @Autowired
    private DietService dietService;
    
@GetMapping
public ResponseEntity<ApiResponse<List<Diet>>> getAllDiets() {
    try {
        List<Diet> diets = dietService.getAllDiets();
        return ResponseEntity.ok(new ApiResponse<>(true, diets, "Dietas obtenidas exitosamente"));
    } catch (Exception e) {
        e.printStackTrace(); // Para ver error completo en logs
        return ResponseEntity.badRequest()
            .body(new ApiResponse<>(false, null, "Error al obtener dietas: " + e.getMessage()));
    }
}

@GetMapping("/{id}")
public ResponseEntity<ApiResponse<Diet>> getDiet(@PathVariable Long id) {
    try {
        Optional<Diet> dietOpt = dietService.getDietById(id);
        if (dietOpt.isPresent()) {
            Diet diet = dietOpt.get();
            return ResponseEntity.ok(new ApiResponse<>(true, diet, "Dieta obtenida exitosamente"));
        } else {
            return ResponseEntity.notFound().build();
        }
    } catch (Exception e) {
        return ResponseEntity.badRequest()
            .body(new ApiResponse<>(false, null, "Error al obtener dieta: " + e.getMessage()));
    }
}
    
    @PostMapping
    public ResponseEntity<ApiResponse<Diet>> createDiet(@RequestBody Diet diet) {
        try {
            Diet savedDiet = dietService.saveDiet(diet);
            return ResponseEntity.ok(new ApiResponse<>(true, savedDiet, "Dieta creada exitosamente"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new ApiResponse<>(false, null, "Error al crear dieta: " + e.getMessage()));
        }
    }
}
