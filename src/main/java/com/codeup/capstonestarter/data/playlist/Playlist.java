package com.codeup.capstonestarter.data.playlist;


import com.codeup.capstonestarter.data.user.User;
import com.codeup.capstonestarter.data.workouts.Workout;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "playlists")
public class Playlist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    public User getUser() {
        return user;
    }


    public void setUser(User user) {
        this.user = user;
    }

    @ManyToOne
            (optional = false)
    private User user;


    @ManyToMany(fetch = FetchType.LAZY,
                cascade = {CascadeType.DETACH, CascadeType.REFRESH},
                targetEntity = Workout.class
    )
    @JoinTable(name = "playlist_workout",
                joinColumns = {@JoinColumn(name = "playlist_id", nullable= false, updatable = false)},
                inverseJoinColumns = {@JoinColumn(name = "workout_id", nullable = false, updatable = false)},
                foreignKey = @ForeignKey(ConstraintMode.CONSTRAINT),
                inverseForeignKey = @ForeignKey(ConstraintMode.CONSTRAINT)
    )
    private List<Workout> workouts;


    public Playlist(){};

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<Workout> getWorkouts() {
        return workouts;
    }

    public void setWorkouts(List<Workout> workouts) {
        this.workouts = workouts;
    }
}
