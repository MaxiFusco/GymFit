package com.gymfit.controller;

import com.gymfit.dto.ApiResponse;
import com.gymfit.dto.ConsultationRequest;
import com.gymfit.model.Product;
import com.gymfit.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:8080")
public class ProductController {
    
    @Autowired
    private ProductService productService;
    
    @GetMapping
    public ResponseEntity<ApiResponse<List<Product>>> getAllProducts() {
        try {
            List<Product> products = productService.getAllProducts();
            return ResponseEntity.ok(new ApiResponse<>(true, products, "Productos obtenidos exitosamente"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new ApiResponse<>(false, null, "Error al obtener productos: " + e.getMessage()));
        }
    }
    
@GetMapping("/{id}")
public ResponseEntity<ApiResponse<Product>> getProduct(@PathVariable Long id) {
    try {
        Optional<Product> productOpt = productService.getProductById(id);
        if (productOpt.isPresent()) {
            Product product = productOpt.get();
            return ResponseEntity.ok(new ApiResponse<>(true, product, "Producto obtenido exitosamente"));
        } else {
            return ResponseEntity.notFound().build();
        }
    } catch (Exception e) {
        return ResponseEntity.badRequest()
            .body(new ApiResponse<>(false, null, "Error al obtener producto: " + e.getMessage()));
    }
}

    @PostMapping("/consultation")
    public ResponseEntity<ApiResponse<String>> submitConsultation(@RequestBody ConsultationRequest request) {
        try {
            // Aquí puedes agregar lógica para procesar la consulta
            // Por ejemplo, enviar un email, guardar en base de datos, etc.
            String result = "Consulta procesada exitosamente para: " + request.getType();
            return ResponseEntity.ok(new ApiResponse<>(true, result, "Consulta enviada exitosamente"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new ApiResponse<>(false, null, "Error al procesar consulta: " + e.getMessage()));
        }
    }
}
