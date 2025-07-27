package com.gymfit.service;

import com.gymfit.model.Diet;
import com.gymfit.repository.DietRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class DietService {

    @Autowired
    private DietRepository dietRepository;

    public List<Diet> getAllDiets() {
        return dietRepository.findAll();
    }

    public Optional<Diet> getDietById(Long id) {
        return dietRepository.findById(id);
    }

    public Diet saveDiet(Diet diet) {
        return dietRepository.save(diet);
    }
}
