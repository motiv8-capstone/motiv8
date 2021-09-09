package com.codeup.capstonestarter.data.workouts;


import com.codeup.capstonestarter.data.user.User;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

@Entity
@Table(name="workoutPlaylists")
public class Workouts {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String bodyPart;

    @Column(nullable = false)
    private String primaryMuscle;

    @Column(nullable = false)
    private String equipment;

    @Column(nullable = false)
    private String gifUrl;

    @Column(nullable = false)
    private int rating;


    @ManyToOne
    @JsonIgnoreProperties({"workouts", "password"})
    private User user;



    public Workouts(Long id, String name, String bodyPart, String primaryMuscle, String equipment, String gifUrl, int rating) {
        this.id = id;
        this.name = name;
        this.bodyPart = bodyPart;
        this.primaryMuscle = primaryMuscle;
        this.equipment = equipment;
        this.gifUrl = gifUrl;
        this.rating = rating;
    }

    public Workouts(){};


    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBodyPart() {
        return bodyPart;
    }

    public void setBodyPart(String bodyPart) {
        this.bodyPart = bodyPart;
    }

    public String getPrimaryMuscle() {
        return primaryMuscle;
    }

    public void setPrimaryMuscle(String primaryMuscle) {
        this.primaryMuscle = primaryMuscle;
    }

    public String getEquipment() {
        return equipment;
    }

    public void setEquipment(String equipment) {
        this.equipment = equipment;
    }

    public String getGifUrl() {
        return gifUrl;
    }

    public void setGifUrl(String gifUrl) {
        this.gifUrl = gifUrl;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }
}
