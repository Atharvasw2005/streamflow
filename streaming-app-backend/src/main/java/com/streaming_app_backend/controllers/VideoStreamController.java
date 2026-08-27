package com.streaming_app_backend.controllers;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
public class VideoStreamController {

    @GetMapping(value = "/videos/{videoId}/{fileName:.+}")
    public ResponseEntity<Resource> streamVideo(
            @PathVariable Long videoId,
            @PathVariable String fileName) {

        try {
            Path baseDir = Paths.get("uploads", "videos", String.valueOf(videoId));
            Path file = baseDir.resolve(fileName).normalize();

            if (!file.startsWith(baseDir)) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid file path");
            }

            Resource resource = new UrlResource(file.toUri());

            if (!resource.exists() || !resource.isReadable()) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Video file not found");
            }

            MediaType mediaType = fileName.endsWith(".m3u8")
                    ? MediaType.parseMediaType("application/vnd.apple.mpegurl")
                    : MediaType.parseMediaType("video/mp2t");

            return ResponseEntity.ok()
                    .contentType(mediaType)
                    .body(resource);

        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Video file not found", e);
        }
    }
}