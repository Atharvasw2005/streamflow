package com.streaming_app_backend.services.Impl;

import com.streaming_app_backend.entities.Video;
import com.streaming_app_backend.helper.S3Properties;
import com.streaming_app_backend.services.S3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.core.sync.ResponseTransformer;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.UUID;


@Service
@RequiredArgsConstructor
public class S3ServiceImpl implements S3Service {

    private final S3Client s3Client;


    private final S3Properties properties;




    @Override
    public String uploadFile(Path file, Long videoId) {

        // Generate S3 object key
        String key = "videos/" + videoId + "/original.mp4";

        // Detect content type
        String contentType;
        try {
            contentType = Files.probeContentType(file);

            if (contentType == null) {
                contentType = "video/mp4";
            }
        } catch (IOException e) {
            contentType = "video/mp4";
        }

        PutObjectRequest request = PutObjectRequest.builder()
                .bucket(properties.getBucketName())
                .key(key)
                .contentType(contentType)
                .build();

        try {

            s3Client.putObject(
                    request,
                    RequestBody.fromFile(file)
            );

            return key;

        } catch (Exception e) {
            throw new RuntimeException("Failed to upload file to S3", e);
        }
    }

    public Path downloadFile(String key) {

        try {

            Path tempFile = Files.createTempFile("video-", ".mp4");

            GetObjectRequest request = GetObjectRequest.builder()
                    .bucket(properties.getBucketName())
                    .key(key)
                    .build();

            s3Client.getObject(
                    request,
                    ResponseTransformer.toFile(tempFile)
            );

            return tempFile;

        } catch (IOException e) {
            throw new RuntimeException("Failed to download file from S3", e);
        }
    }


    public void deleteFile(String key) {

        DeleteObjectRequest request = DeleteObjectRequest.builder()
                .bucket(properties.getBucketName())
                .key(key)
                .build();

        s3Client.deleteObject(request);
    }


    public String uploadHlsFolder(Path folder, Long videoId) throws IOException {

        Files.walk(folder)
                .filter(Files::isRegularFile)
                .forEach(path -> {

                    String key = "videos/" + videoId + "/"
                            + folder.relativize(path)
                            .toString()
                            .replace("\\", "/");

                    String fileName = path.getFileName().toString();

                    String contentType;

                    if (fileName.endsWith(".m3u8")) {
                        contentType = "application/vnd.apple.mpegurl";
                    } else if (fileName.endsWith(".ts")) {
                        contentType = "video/mp2t";
                    } else if (fileName.endsWith(".mp4")) {
                        contentType = "video/mp4";
                    } else {
                        contentType = "application/octet-stream";
                    }

                    s3Client.putObject(
                            PutObjectRequest.builder()
                                    .bucket(properties.getBucketName())
                                    .key(key)
                                    .contentType(contentType)
                                    .build(),
                            RequestBody.fromFile(path)
                    );

                    System.out.println("Uploaded : " + key);
                });

        return "videos/" + videoId + "/master.m3u8";
    }


}
