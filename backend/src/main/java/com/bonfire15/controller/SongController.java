package com.bonfire15.controller;

import com.bonfire15.model.Song;
import com.bonfire15.repository.SongRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/songs")
public class SongController {

    private final SongRepository songRepository;

    public SongController(SongRepository songRepository) {
        this.songRepository = songRepository;
    }

    @GetMapping
    public List<Song> getAllSongs() {
        return songRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Song> getSongById(@PathVariable Long id) {
        return songRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/like")
    public ResponseEntity<Song> likeSong(@PathVariable Long id) {
        return songRepository.findById(id)
                .map(song -> {
                    song.setLikesCount(song.getLikesCount() + 1);
                    Song savedSong = songRepository.save(song);
                    return ResponseEntity.ok(savedSong);
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
