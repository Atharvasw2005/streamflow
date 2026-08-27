package com.streaming_app_backend.services.Impl;

import com.streaming_app_backend.cloud.s3.service.Impl.S3ServiceImpl;
import com.streaming_app_backend.entities.Video;
import com.streaming_app_backend.entities.VideoStatus;
import com.streaming_app_backend.repositories.VideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class VideoProcessingService {

    @Autowired
    private VideoRepository videoRepository;

    @Autowired
    private S3ServiceImpl s3Service;

    @Value("${files.hls}")
    private String hlsFolder;

    public void processVideo(long videoId) throws Exception {
        Video video = videoRepository.findById(videoId)
                .orElseThrow(() -> new IllegalArgumentException("Video not found: " + videoId));

        Path inputVideo = Paths.get(video.getFilePath());
        System.out.println("Started Processing : " + videoId);

        Path outputFolder = Paths.get(hlsFolder, String.valueOf(videoId));
        Path folder360 = outputFolder.resolve("360");
        Path folder480 = outputFolder.resolve("480");
        Path folder720 = outputFolder.resolve("720");
        Path folder1080 = outputFolder.resolve("1080");

        try {
            Files.createDirectories(folder360);
            Files.createDirectories(folder480);
            Files.createDirectories(folder720);
            Files.createDirectories(folder1080);

            ProcessBuilder pb = new ProcessBuilder(
                    "ffmpeg",
                    "-i", inputVideo.toString(),
                    "-filter_complex",
                    "[0:v]split=4[v360][v480][v720][v1080];" +
                            "[v360]scale=640:360[out360];" +
                            "[v480]scale=854:480[out480];" +
                            "[v720]scale=1280:720[out720];" +
                            "[v1080]scale=1920:1080[out1080]",
                    "-map", "[out360]",
                    "-map", "0:a?",
                    "-c:v:0", "libx264",
                    "-c:a:0", "aac",
                    "-b:v:0", "800k",
                    "-map", "[out480]",
                    "-map", "0:a?",
                    "-c:v:1", "libx264",
                    "-c:a:1", "aac",
                    "-b:v:1", "1400k",
                    "-map", "[out720]",
                    "-map", "0:a?",
                    "-c:v:2", "libx264",
                    "-c:a:2", "aac",
                    "-b:v:2", "2800k",
                    "-map", "[out1080]",
                    "-map", "0:a?",
                    "-c:v:3", "libx264",
                    "-c:a:3", "aac",
                    "-b:v:3", "5000k",
                    "-f", "hls",
                    "-hls_time", "10",
                    "-hls_playlist_type", "vod",
                    "-master_pl_name", "master.m3u8",
                    "-var_stream_map",
                    "v:0,a:0,name:360 v:1,a:1,name:480 v:2,a:2,name:720 v:3,a:3,name:1080",
                    "-hls_segment_filename",
                    outputFolder.toString() + "/%v/segment_%03d.ts",
                    outputFolder.toString() + "/%v/playlist.m3u8"
            );

            pb.redirectErrorStream(true);
            Process process = pb.start();

            try (BufferedReader reader = new BufferedReader(
                    new InputStreamReader(process.getInputStream()))) {
                String line;
                while ((line = reader.readLine()) != null) {
                    System.out.println(line);
                }
            }

            int exitCode = process.waitFor();

            if (exitCode == 0) {
                // Upload original video to S3
                String mp4Key = s3Service.uploadFile(inputVideo, video.getVideo_id());

                // Upload HLS folder to S3
                String hlsKey = s3Service.uploadHlsFolder(outputFolder, video.getVideo_id());

                // Save manifest URL or object key
                video.setFilePath(mp4Key);
                video.setHlsUrl("https://bucket-name.s3.amazonaws.com/videos/" + videoId + "/master.m3u8");
                video.setStatus(VideoStatus.COMPLETED);
                videoRepository.save(video);

                System.out.println("Video Processed Successfully");
                System.out.println("HLS manifest path/key: " + hlsKey);
            } else {
                video.setStatus(VideoStatus.FAILED);
                videoRepository.save(video);
                throw new RuntimeException("FFmpeg Failed. Exit Code = " + exitCode);
            }

        } catch (Exception e) {
            video.setStatus(VideoStatus.FAILED);
            videoRepository.save(video);
            throw new RuntimeException("Video processing failed", e);

        } finally {
            // IMPORTANT: do not delete HLS folder right away
            // If you must clean up local temp files, delete only after upload is confirmed
            Files.deleteIfExists(inputVideo);

            // Remove this line for HLS to work:
            // FileSystemUtils.deleteRecursively(outputFolder);
        }

        System.out.println("Completed Processing : " + videoId);
    }
}