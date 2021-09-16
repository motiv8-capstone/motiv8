package com.codeup.capstonestarter.data.user;

import com.codeup.capstonestarter.data.playlist.Playlist;
import com.codeup.capstonestarter.data.workouts.Workout;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.Email;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name="users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Email
    @Column(nullable = false)
    private String email;

    @OneToMany(mappedBy = "user")
    @JsonIgnoreProperties("user")
    private List<Playlist> playlists;


    public User(Long id, String username, String password, String email, List<Playlist> playlists) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.playlists = playlists;
    }

    public User(){}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
