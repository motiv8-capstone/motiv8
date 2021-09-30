package com.codeup.capstonestarter.web;


import com.codeup.capstonestarter.data.playlist.Playlist;
import com.codeup.capstonestarter.data.playlist.PlaylistRepository;
import com.codeup.capstonestarter.data.workouts.Workout;
import com.codeup.capstonestarter.data.workouts.WorkoutsRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping(value = "/api/workouts", headers = "Accept=application/json")
public class WorkoutsController {

    private final WorkoutsRepository workoutsRepository;
    private final PlaylistRepository playlistRepository;

    public WorkoutsController(WorkoutsRepository workoutsRepository, PlaylistRepository playlistRepository) {
        this.workoutsRepository = workoutsRepository;
        this.playlistRepository = playlistRepository;
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
    private void deleteWorkoutFromPlaylist(@PathVariable Long id, Long workoutID){
        Playlist playlist = playlistRepository.findById(id).get();
        Workout workout = workoutsRepository.findById(workoutID).get();
        playlist.removeWorkout(workout);
        playlistRepository.save(playlist);
    }

}
