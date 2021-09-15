package com.codeup.capstonestarter.data.playlist;


import com.codeup.capstonestarter.data.workouts.Workout;

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

    @Column(nullable = false)
    private String content;



    @ManyToMany(fetch = FetchType.LAZY,
                cascade = {CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH})
    @JoinTable(name = "playlist_workout",
                joinColumns = {@JoinColumn(name = "playlist_id", nullable= false, updatable = false)},
                inverseJoinColumns = {@JoinColumn(name = "workout_id", nullable = false, updatable = false)},
                foreignKey = @ForeignKey(ConstraintMode.CONSTRAINT),
                inverseForeignKey = @ForeignKey(ConstraintMode.CONSTRAINT)
    )
    private List<Workout> workouts;



    public Playlist(Long id, String title, String content) {
        this.id = id;
        this.title = title;
        this.content = content;
    }

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

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public List<Workout> getWorkouts() {
        return workouts;
    }

    public void setWorkouts(List<Workout> workouts) {
        this.workouts = workouts;
    }
}