package com.gymfit.controller;

import com.gymfit.dto.ApiResponse;
import com.gymfit.model.Diet;
import com.gymfit.model.User;
import com.gymfit.repository.DietRepository;
import com.gymfit.repository.UserRepository;
import com.gymfit.service.DietService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.security.Principal;
import java.util.Map;
import java.util.Optional;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/api/diets")
@CrossOrigin(origins = "http://localhost:8080")
public class DietController {
    
    @Autowired
    private DietService dietService;
     @Autowired
    private DietRepository dietRepository;
      @Autowired
    private UserRepository userRepository;
    
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
     @PostMapping("/add")
    public ResponseEntity<?> addDiet(@RequestBody Diet diet, Principal principal) {
      Optional<User> userOpt = userRepository.findByEmail(principal.getName());
        if (userOpt.isEmpty() || !"ADMIN".equals(userOpt.get().getRole())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access denied");
        }
        dietRepository.save(diet);
        return ResponseEntity.ok("Diet added");
    }

    @PutMapping("/{id}")
public ResponseEntity<?> updateDiet(@PathVariable Long id, @RequestBody Diet diet) {
    Optional<Diet> existing = dietRepository.findById(id);
    if (existing.isEmpty()) {
        return ResponseEntity.notFound().build();
    }

    diet.setId(id);
    dietRepository.save(diet);
  return ResponseEntity.ok(Map.of("success", true, "message", "Diet updated"));
}

}

    
    

