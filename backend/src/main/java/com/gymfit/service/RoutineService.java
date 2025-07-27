package com.gymfit.service;

import com.gymfit.model.Routine;
import com.gymfit.repository.RoutineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class RoutineService {

    @Autowired
    private RoutineRepository routineRepository;

    public List<Routine> getAllRoutines() {
        return routineRepository.findAll();
    }

    public Optional<Routine> getRoutineById(Long id) {
        return routineRepository.findById(id);
    }

    public Routine saveRoutine(Routine routine) {
        return routineRepository.save(routine);
    }
}
