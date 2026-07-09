package com.streaming_app_backend.repositories;

import com.streaming_app_backend.entities.Video;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface VideoRepository extends JpaRepository<Video,Long> {

    Optional<Video> findByTitle(String title);
}
