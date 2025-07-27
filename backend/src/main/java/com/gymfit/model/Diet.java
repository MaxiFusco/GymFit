package com.gymfit.model;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonValue;
import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "diets")
public class Diet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String title;
    
    @Column(nullable = false)
    private String description;
    
    @Column(columnDefinition = "TEXT")
    private String content;
    
    @Enumerated(EnumType.STRING)
    private DietType type;
    
  @OneToMany(mappedBy = "diet", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
@JsonManagedReference
private List<Meal> meals;
    
    public enum DietType {
        VEGETARIANO("vegetariano"),
        VEGANO("vegano"),
        CARNE("carne");
        
        private String value;
        
        DietType(String value) {
            this.value = value;
        }
           @JsonValue
        public String getValue() {
            return value;
        }
      
    }
    
    // Constructors
    public Diet() {}
    
    public Diet(String title, String description, String content, DietType type) {
        this.title = title;
        this.description = description;
        this.content = content;
        this.type = type;
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    
    public DietType getType() { return type; }
    public void setType(DietType type) { this.type = type; }
    
    public List<Meal> getMeals() { return meals; }
    public void setMeals(List<Meal> meals) { this.meals = meals; }
}
