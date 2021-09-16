package com.codeup.capstonestarter.web;


import com.codeup.capstonestarter.data.playlist.Playlist;
import com.codeup.capstonestarter.data.playlist.PlaylistRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/playlists", headers = "Accept=application/json")
public class PlaylistController {

    private final PlaylistRepository playlistRepository;

    public PlaylistController(PlaylistRepository playlistRepository) {
        this.playlistRepository = playlistRepository;
    }

    @GetMapping
    private List<Playlist> getPlaylists(){
        return playlistRepository.findAll();
    }

    @PostMapping
    private void createNewPlaylist(@RequestBody Playlist newPlaylist){
        playlistRepository.save(newPlaylist);
    }


}
