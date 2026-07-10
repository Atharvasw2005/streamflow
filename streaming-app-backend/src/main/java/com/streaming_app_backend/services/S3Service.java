package com.streaming_app_backend.services;


import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;

public interface S3Service {

    String  uploadFile(Path file, Long videoId);
}
