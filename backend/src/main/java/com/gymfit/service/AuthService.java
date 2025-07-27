package com.gymfit.service;

import com.gymfit.dto.AuthResponse;
import com.gymfit.dto.LoginRequest;
import com.gymfit.dto.RegisterRequest;
import com.gymfit.model.User;
import com.gymfit.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class AuthService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    public AuthResponse login(LoginRequest request) throws Exception {
        User user = userRepository.findByEmail(request.getEmail());
        
        if (user == null) {
            throw new Exception("Usuario no encontrado");
        }
        
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new Exception("Contraseña incorrecta");
        }
        
        // Generar token JWT (simplificado - en producción usar JWT real)
        String token = generateToken(user);
        
        // No devolver la contraseña en la respuesta
        user.setPassword(null);
        
        return new AuthResponse(user, token);
    }
    
    public AuthResponse register(RegisterRequest request) throws Exception {
        // Verificar si el usuario ya existe
        if (userRepository.findByEmail(request.getEmail()) != null) {
            throw new Exception("El email ya está registrado");
        }
        
        // Crear nuevo usuario
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setName(request.getName());
        user.setAge(request.getAge());
        
        // Guardar usuario
        user = userRepository.save(user);
        
        // Generar token
        String token = generateToken(user);
        
        // No devolver la contraseña en la respuesta
        user.setPassword(null);
        
        return new AuthResponse(user, token);
    }
    
    private String generateToken(User user) {
        // En producción, usar JWT real con library como JJWT
        // Por simplicidad, generamos un UUID
        return UUID.randomUUID().toString() + "_" + user.getId();
    }
}
