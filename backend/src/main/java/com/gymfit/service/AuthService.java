package com.gymfit.service;

import com.gymfit.dto.AuthResponse;
import com.gymfit.dto.LoginRequest;
import com.gymfit.dto.RegisterRequest;
import com.gymfit.model.User;
import com.gymfit.repository.UserRepository;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
public AuthResponse login(LoginRequest request) {
    Optional<User> userOpt = userRepository.findByEmail(request.getEmail());
    
    if (userOpt.isEmpty()) {
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado");
    }

    User user = userOpt.get();
    
    if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Contraseña incorrecta");
    }
    

    String token = generateToken(user);
    
    user.setPassword(null); 
    return new AuthResponse(user, token);
}
    
    public AuthResponse register(RegisterRequest request) {
    Optional<User> existingUser = userRepository.findByEmail(request.getEmail());
    if (existingUser.isPresent()) {
        throw new ResponseStatusException(HttpStatus.CONFLICT, "El email ya está registrado");
    }
        
   
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setName(request.getName());
        user.setAge(request.getAge());
        
        // Guardar usuario
        user = userRepository.save(user);
        
        // Generar token
        String token = generateToken(user);
        
        user.setPassword(null); 

        return new AuthResponse(user, token);
    }
    
    private String generateToken(User user) {
        return UUID.randomUUID().toString() + "_" + user.getId();
    }
}
