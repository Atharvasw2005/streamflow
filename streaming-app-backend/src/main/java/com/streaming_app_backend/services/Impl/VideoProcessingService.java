package com.streaming_app_backend.services.Impl;


import com.streaming_app_backend.cloud.s3.service.Impl.S3ServiceImpl;
import com.streaming_app_backend.entities.Video;
import com.streaming_app_backend.entities.VideoStatus;
import com.streaming_app_backend.repositories.VideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;

import java.io.BufferedReader;
import java.io.IOException;
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


    public void processVideo(long videoId) throws IOException {

        Video video = videoRepository.findById(videoId).get();

        Path inputVideo = Paths.get(video.getFilePath());


        System.out.println("Started Processing : " + videoId);


        Path outputFolder = Paths.get(hlsFolder, String.valueOf(videoId));

        // Quality Folders
        Path folder360 = outputFolder.resolve("360");
        Path folder480 = outputFolder.resolve("480");
        Path folder720 = outputFolder.resolve("720");
        Path folder1080 = outputFolder.resolve("1080");

        // FFmpeg Logic Here

        try {

//            throw new Exception("I Am Manually inturript");

            // Create Directories
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

                    // 360
                    "-map", "[out360]",
                    "-map", "0:a?",
                    "-c:v:0", "libx264",
                    "-c:a:0", "aac",
                    "-b:v:0", "800k",

                    // 480
                    "-map", "[out480]",
                    "-map", "0:a?",
                    "-c:v:1", "libx264",
                    "-c:a:1", "aac",
                    "-b:v:1", "1400k",

                    // 720
                    "-map", "[out720]",
                    "-map", "0:a?",
                    "-c:v:2", "libx264",
                    "-c:a:2", "aac",
                    "-b:v:2", "2800k",

                    //1080
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

            BufferedReader reader = new BufferedReader(
                    new InputStreamReader(process.getInputStream())
            );

            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }

            int exitCode = process.waitFor();

            if (exitCode == 0) {
                // Upload Original Video
                String mp4Key = s3Service.uploadFile(inputVideo, video.getVideo_id());

// Upload HLS Folder
                String hlsKey = s3Service.uploadHlsFolder(
                        outputFolder,
                        video.getVideo_id()
                );

// Save HLS URL
                video.setFilePath(hlsKey);
                video.setStatus(VideoStatus.COMPLETED);
                videoRepository.save(video);
                System.out.println("Video Processed Successfully");

            }
            else {

                video.setStatus(VideoStatus.FAILED);
                videoRepository.save(video);
                System.out.println("FFmpeg Failed. Exit Code = " + exitCode);
            }




        } catch (Exception e) {

            video.setStatus(VideoStatus.FAILED);
            videoRepository.save(video);
            throw new RuntimeException(e);
        }
        finally{
            // Delete MP4
            Files.deleteIfExists(inputVideo);

// Delete HLS Folder
            FileSystemUtils.deleteRecursively(outputFolder);
        }




        System.out.println("Completed Processing : " + videoId);
    }
}
