package com.streaming_app_backend.services.Impl;

import com.streaming_app_backend.Dtos.VideoUploadRequestDto;
import com.streaming_app_backend.Dtos.VideoUploadResponseDto;
import com.streaming_app_backend.entities.Video;
import com.streaming_app_backend.entities.VideoStatus;
import com.streaming_app_backend.rabbitMQ.producer.RabbitMQProducer;
import com.streaming_app_backend.repositories.VideoRepository;
import com.streaming_app_backend.services.VideoService;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;

import org.modelmapper.ModelMapper;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
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

    private final RabbitMQProducer rabbitMQProducer;

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

            //MetaData save in database
            videoRepository.save(video);

//            videoRepository.save(createdVideo);

            rabbitMQProducer.senndMessage(video.getVideo_id());



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



}
