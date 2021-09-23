package com.codeup.capstonestarter.web;


import com.codeup.capstonestarter.data.playlist.Playlist;
import com.codeup.capstonestarter.data.playlist.PlaylistRepository;
import com.codeup.capstonestarter.data.user.User;
import com.codeup.capstonestarter.data.user.UserRepository;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/playlists", headers = "Accept=application/json")
public class PlaylistController {

    private final PlaylistRepository playlistRepository;
    private final UserRepository userRepository;

    public PlaylistController(PlaylistRepository playlistRepository, UserRepository userRepository) {
        this.playlistRepository = playlistRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    private List<Playlist> getAll(){
        return playlistRepository.findAll();
    }



    @PostMapping
    private void createNewPlaylist(@RequestBody Playlist newPlaylist, OAuth2Authentication auth){
        String email = auth.getName();
        User user = userRepository.findByEmail(email).get();
        newPlaylist.setUser(user);
        Playlist oldplaylist = playlistRepository.getById(newPlaylist.getId());
        oldplaylist.getWorkouts().add(newPlaylist.getWorkouts().get(0));

        playlistRepository.save(oldplaylist);
    }


    @PutMapping("/{id}")
    private void edit(@RequestBody Playlist playlist, OAuth2Authentication auth){
        String email = auth.getName();
        User user = userRepository.findByEmail(email).get();
        playlist.setUser(user);

        playlistRepository.save(playlist);
    }



}
