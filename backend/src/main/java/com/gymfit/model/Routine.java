package com.gymfit.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "routines")
public class Routine {
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
    private Level level;
    
    @OneToMany(mappedBy = "routine", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Exercise> exercises;
    
    public enum Level {
        SUPERIOR("superior"),
        MEDIO("medio"), 
        INFERIOR("inferior");
        
        private String value;
        
        Level(String value) {
            this.value = value;
        }
        
        public String getValue() {
            return value;
        }
    }
    
    public Routine() {}
    
    public Routine(String title, String description, String content, Level level) {
        this.title = title;
        this.description = description;
        this.content = content;
        this.level = level;
    }
    

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    
    public Level getLevel() { return level; }
    public void setLevel(Level level) { this.level = level; }
    
    public List<Exercise> getExercises() { return exercises; }
    public void setExercises(List<Exercise> exercises) { this.exercises = exercises; }
}
