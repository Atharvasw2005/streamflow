package com.streaming_app_backend.services;

import com.streaming_app_backend.Dtos.VideoUploadRequestDto;
import com.streaming_app_backend.Dtos.VideoUploadResponseDto;
import com.streaming_app_backend.entities.Video;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface VideoService {

    //Save Video
    VideoUploadResponseDto saveVideo(VideoUploadRequestDto video, MultipartFile file);

    //Get Video By ID
    Video getById(long id);

    //Get Video By Title
    Video getByTitle(String title);

    //Get All Video
    List<Video> getVideos();

}
