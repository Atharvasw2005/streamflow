package com.streaming_app_backend.entities;


import jakarta.annotation.PostConstruct;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;

@Entity
@Table(name = "app_video")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Video {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long video_id;

    private String title;
    private String description;
    private String contentType;
    private Instant created_at = Instant.now() ;
    private String filePath;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private VideoStatus status;

}
