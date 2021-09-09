package com.codeup.capstonestarter.web;


import com.codeup.capstonestarter.data.workouts.Workouts;
import com.codeup.capstonestarter.data.workouts.WorkoutsRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/workouts", headers = "Accept=application/json")
public class WorkoutsController {

    private final WorkoutsRepository workoutsRepository;

    public WorkoutsController(WorkoutsRepository workoutsRepository) {
        this.workoutsRepository = workoutsRepository;
    }

    @GetMapping
    private List<Workouts> getWorkouts(){
        return workoutsRepository.findAll();
    }


    @PostMapping
    private void createWorkout(@RequestBody Workouts newPlaylist){

        System.out.println(newPlaylist.getBodyPart());
        System.out.println(newPlaylist.getUser());

        workoutsRepository.save(newPlaylist);
    }


    @DeleteMapping("{id}")
    private void deleteWorkout(@PathVariable Long id){
        workoutsRepository.deleteById(id);
    }




}
