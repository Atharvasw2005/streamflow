package com.streaming_app_backend.services.Impl;

import com.streaming_app_backend.Dtos.VideoUploadRequestDto;
import com.streaming_app_backend.Dtos.VideoUploadResponseDto;
import com.streaming_app_backend.entities.Video;
import com.streaming_app_backend.entities.VideoStatus;
import com.streaming_app_backend.repositories.VideoRepository;
import com.streaming_app_backend.services.VideoService;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class VideoServiceImpl implements VideoService {

    private final VideoRepository videoRepository;
    private final ModelMapper modelMapper;

    private final VideoProcessingService videoProcessingService;

    @Value("${files.video}")
    private String videoFolder;

    @Value("${files.hls}")
    private String hlsFolder;


    @PostConstruct
    public void init() throws IOException {


        File folder = new File(videoFolder);

        Files.createDirectories(Paths.get(hlsFolder));

        if(!folder.exists()){
            folder.mkdir();
            System.out.println("Folder created");
        }
        else{
            System.out.println("Folder already exists");
        }

    }

    //save Video

    // video --> Video MetaData
    @Override
    public VideoUploadResponseDto saveVideo(VideoUploadRequestDto videoDto, MultipartFile file)
    {
        try{

            Video video = new Video();


            String fileName = file.getOriginalFilename();
            String contentType = file.getContentType();
            InputStream inputStream = file.getInputStream();

            //Folder Path Create

                //File path
                String cleanFileName = StringUtils.cleanPath(fileName);

                //Folder path
                String cleanFolderName = StringUtils.cleanPath(videoFolder);

                //Folder Path with file name
                Path path = Paths.get(cleanFolderName, cleanFileName);




            //Copy file to Folder
            Files.copy(inputStream, path, StandardCopyOption.REPLACE_EXISTING);

            //Video MetaData
            video.setContentType(contentType);
            video.setFilePath(path.toString());
            video.setTitle(videoDto.getTitle());
            video.setDescription(videoDto.getDescription());




            video.setStatus(VideoStatus.PROCESSING);

            videoRepository.save(video);

//            videoRepository.save(createdVideo);


            videoProcessingService.processVideo(video.getVideo_id());


            //MetaData save in database
           return modelMapper.map(video, VideoUploadResponseDto.class);

        }
        catch(Exception ex)
        {
            System.err.println(ex.getMessage());
        }
        return null;
    }

    //get video by id

    @Override
    public Video getById(long id){

     return videoRepository.findById(id)
             .orElseThrow(
                     () -> new RuntimeException("Video Not Found!")
             );
    }

    //get video by title

    @Override
    public Video getByTitle(String title){
        return videoRepository.findByTitle(title).orElseThrow(
                () -> new RuntimeException("Video with title " + title + " not found")
        );
    }

    //get All Video

    @Override
    public  List<Video> getVideos(){
        return videoRepository.findAll();
    }




//    public long processVideo(long videoId) {
//
//        Video video = getById(videoId);
//
//        Path inputVideo = Paths.get(video.getFilePath());
//
//        // Main Folder
//        Path outputFolder = Paths.get(hlsFolder, String.valueOf(videoId));
//
//        // Quality Folders
//        Path folder360 = outputFolder.resolve("360");
//        Path folder480 = outputFolder.resolve("480");
//        Path folder720 = outputFolder.resolve("720");
//        Path folder1080 = outputFolder.resolve("1080");
//
//        try {
//
//            // Create Directories
//            Files.createDirectories(folder360);
//            Files.createDirectories(folder480);
//            Files.createDirectories(folder720);
//            Files.createDirectories(folder1080);
//
//
//
//            ProcessBuilder pb = new ProcessBuilder(
//                    "ffmpeg",
//                    "-i", inputVideo.toString(),
//
//                    "-filter_complex",
//                    "[0:v]split=4[v360][v480][v720][v1080];" +
//                            "[v360]scale=640:360[out360];" +
//                            "[v480]scale=854:480[out480];" +
//                            "[v720]scale=1280:720[out720];" +
//                            "[v1080]scale=1920:1080[out1080]",
//
//                    // 360
//                    "-map", "[out360]",
//                    "-map", "0:a?",
//                    "-c:v:0", "libx264",
//                    "-c:a:0", "aac",
//                    "-b:v:0", "800k",
//
//                    // 480
//                    "-map", "[out480]",
//                    "-map", "0:a?",
//                    "-c:v:1", "libx264",
//                    "-c:a:1", "aac",
//                    "-b:v:1", "1400k",
//
//                    // 720
//                    "-map", "[out720]",
//                    "-map", "0:a?",
//                    "-c:v:2", "libx264",
//                    "-c:a:2", "aac",
//                    "-b:v:2", "2800k",
//
//                    //1080
//                    "-map", "[out1080]",
//                    "-map", "0:a?",
//                    "-c:v:3", "libx264",
//                    "-c:a:3", "aac",
//                    "-b:v:3", "5000k",
//
//                    "-f", "hls",
//                    "-hls_time", "10",
//                    "-hls_playlist_type", "vod",
//
//                    "-master_pl_name", "master.m3u8",
//
//                    "-var_stream_map",
//                    "v:0,a:0,name:360 v:1,a:1,name:480 v:2,a:2,name:720 v:3,a:3,name:1080",
//
//                    "-hls_segment_filename",
//                    outputFolder.toString() + "/%v/segment_%03d.ts",
//
//                    outputFolder.toString() + "/%v/playlist.m3u8"
//            );
//
//            Process process = pb.start();
//
//            int exit = process.waitFor();
//
//            System.out.println(exit);
//
//
//
//        } catch (Exception e) {
//
//        }
//
//        return videoId;
//    }

}
