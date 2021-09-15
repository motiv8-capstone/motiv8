package com.codeup.capstonestarter.web;


import com.codeup.capstonestarter.data.workouts.Workout;
import com.codeup.capstonestarter.data.workouts.WorkoutsRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping(value = "/api/workouts", headers = "Accept=application/json")
public class WorkoutsController {

    private final WorkoutsRepository workoutsRepository;

    public WorkoutsController(WorkoutsRepository workoutsRepository) {
        this.workoutsRepository = workoutsRepository;
    }




    @GetMapping
    private List<Workout> getWorkouts() {
        return workoutsRepository.findAll();
    }

    @GetMapping("/findByBodyPart")
    private List<Workout> getByBodyPart(@RequestParam String bodyPart){
        return workoutsRepository.findByBodyPart(bodyPart);
    }


    @PostMapping
    private void createWorkout(@RequestBody Workout[] workouts) {
            workoutsRepository.saveAll(Arrays.asList(workouts));
    }

    @DeleteMapping("{id}")
    private void deleteWorkout(@PathVariable Long id) {
        workoutsRepository.deleteById(id);
    }


}
