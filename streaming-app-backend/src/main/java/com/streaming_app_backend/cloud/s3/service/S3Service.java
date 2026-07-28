package com.streaming_app_backend.cloud.s3.service;


import java.nio.file.Path;

public interface S3Service {

    String  uploadFile(Path file, Long videoId);
}
