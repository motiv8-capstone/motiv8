package com.codeup.capstonestarter.data.workouts;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface WorkoutsRepository extends JpaRepository<Workout, Long> {

    @Query(nativeQuery = true, value = "SELECT * FROM workouts WHERE JSON_EXTRACT(workout, '$.bodyPart') = :bodyPart")
    List<Workout> findByBodyPart(String bodyPart);

}
