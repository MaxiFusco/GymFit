package com.gymfit.controller;

import com.gymfit.dto.*;
import com.gymfit.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:8080")
public class AuthController {
    
    @Autowired
    private AuthService authService;
    
    @PostMapping("/login")
public ResponseEntity<ApiResponse<AuthResponse>> login(@RequestBody LoginRequest request) {
    System.out.println("Login request recibido: " + request);
    try {
        AuthResponse authResponse = authService.login(request);
        return ResponseEntity.ok(new ApiResponse<>(true, authResponse, "Login exitoso"));
    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.badRequest()
            .body(new ApiResponse<>(false, null, "Error al iniciar sesión: " + e.getMessage()));
    }
}
    
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AuthResponse>> register(@RequestBody RegisterRequest request) {
        try {
            AuthResponse authResponse = authService.register(request);
            return ResponseEntity.ok(new ApiResponse<>(true, authResponse, "Registro exitoso"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new ApiResponse<>(false, null, "Error al registrarse: " + e.getMessage()));
        }
    }
    
    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<Void>> logout() {
        // En una implementación real, aquí invalidarías el token
        return ResponseEntity.ok(new ApiResponse<>(true, null, "Sesión cerrada exitosamente"));
    }
}
