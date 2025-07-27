package com.gymfit.dto;

public class RegisterRequest {
    private String email;
    private String password;
    private String name;
    private Integer age;
    
    public RegisterRequest() {}
    
    public RegisterRequest(String email, String password, String name, Integer age) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.age = age;
    }
    
    // Getters and Setters
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public Integer getAge() { return age; }
    public void setAge(Integer age) { this.age = age; }
}
