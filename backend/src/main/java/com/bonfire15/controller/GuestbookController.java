package com.bonfire15.controller;

import com.bonfire15.model.Comment;
import com.bonfire15.repository.CommentRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/guestbook")
public class GuestbookController {

    private final CommentRepository commentRepository;

    public GuestbookController(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    @GetMapping
    public List<Comment> getAllComments() {
        return commentRepository.findAllByOrderByTimestampDesc();
    }

    @PostMapping
    public ResponseEntity<?> addComment(@RequestBody Comment comment) {
        if (comment.getUsername() == null || comment.getUsername().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Username cannot be empty");
        }
        if (comment.getContent() == null || comment.getContent().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Message content cannot be empty");
        }
        
        // Clean inputs and set fresh timestamp
        comment.setUsername(comment.getUsername().trim());
        comment.setContent(comment.getContent().trim());
        comment.setTimestamp(LocalDateTime.now());
        
        Comment savedComment = commentRepository.save(comment);
        return ResponseEntity.ok(savedComment);
    }
}
