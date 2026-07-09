package com.streaming_app_backend.controllers;

import com.streaming_app_backend.Dtos.ApiResponseDto;
import com.streaming_app_backend.Dtos.VideoUploadResponseDto;
import com.streaming_app_backend.Dtos.VideoUploadRequestDto;
import com.streaming_app_backend.entities.Video;
import com.streaming_app_backend.services.VideoService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/video")
@RequiredArgsConstructor
public class VideoController {

    private final VideoService videoService;
    @PostMapping
    public ResponseEntity<ApiResponseDto<VideoUploadResponseDto>> create(
            @RequestParam("file") MultipartFile file,
            @RequestParam("title") String title,
            @RequestParam("description") String description
            ){

        if(file.isEmpty()){
           throw new RuntimeException("file is empty");
        }

        VideoUploadRequestDto request = VideoUploadRequestDto.builder()
                .title(title)
                .description(description)
                .build();


        VideoUploadResponseDto response = videoService.saveVideo( request, file);
         response.setMessage("Video Created Successfully");


        return ResponseEntity.status(HttpStatus.CREATED)
                .body(
                        ApiResponseDto.<VideoUploadResponseDto>builder()
                                .message("Video Uploaded Successfully")
                                .data(response)
                                .build()
                );
    }

    //get all video

    @GetMapping
    public List<Video> getAllVideo(){
        return videoService.getVideos();
    }


// Stream Video Progressive   http://localhost:8080/api/v1/video/stream

    @GetMapping("/stream/{videoId}")
    //Stream Video
    public ResponseEntity<Resource> stream(
            @PathVariable long videoId
    ){
        Video video = videoService.getById(videoId);

        String contentType = video.getContentType();
        String filepath = video.getFilePath();

        Resource file = new FileSystemResource(filepath);

        if(contentType==null || contentType.isEmpty()){
            contentType = "video/mp4";
        }



        return ResponseEntity.ok().contentType(
                MediaType.parseMediaType(contentType)
        ).body(
          file );



    }


    // Byte Range

    @GetMapping("/stream/range/{videId}")
    public ResponseEntity<Resource> streamRange(
            @PathVariable long videId,
            @RequestHeader(value= "Range" , required = false)String range
    ){

         final long CHUNK_SIZE = 1024*1024;


        System.out.println(range);

        Video video = videoService.getById(videId);
        Path path = Paths.get(video.getFilePath());

        Resource resource = new FileSystemResource(path);

        String contentType = video.getContentType();

        if(contentType==null || contentType.isEmpty()){
            contentType = "video/mp4";
        }

        long fileLength = path.toFile().length();


        //Direcly send video if range is null
         if (range == null || range.isEmpty()) {
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .header("Accept-Ranges", "bytes")
                    .contentLength(fileLength)
                    .body(resource);
        }



        long rangeStart;

        long rangeEnd;
        //Range: bytes = 555 - 55
        String ranges[] = range.replace("bytes=","").split("-");

        rangeStart = Long.parseLong(ranges[0]);

       rangeEnd = rangeStart + CHUNK_SIZE - 1;

       if(rangeEnd >= fileLength){
           rangeEnd = fileLength-1;
       }



        try{


            InputStream inputStream = Files.newInputStream(path);
            inputStream.skip(rangeStart);


            long contentLength = rangeEnd-rangeStart+1;



            HttpHeaders header = new HttpHeaders();
            header.add("Accept-Ranges", "bytes");
            header.add("Content-Range",
                    "bytes " + rangeStart + "-" + rangeEnd + "/" + fileLength);
            header.add("Cache-Control", "no-cache");
            header.setContentLength(contentLength);



            InputStream limited =
                    org.apache.commons.io.input.BoundedInputStream
                            .builder()
                            .setInputStream(inputStream)
                            .setMaxCount(contentLength)
                            .get();

            System.out.println(limited);




           return ResponseEntity
                   .status(HttpStatus.PARTIAL_CONTENT)
                   .headers(header)
                           .contentType(MediaType.parseMediaType(contentType))
                                   .body(new InputStreamResource(limited));



        }catch(IOException e)
        {
           return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }



    //master.m2u8 file

    @Value("${files.hls}")
    private String videoHls;


    @GetMapping(
            value = "/{videoId}/master.m3u8",
            produces = "application/vnd.apple.mpegurl"
    )
    public ResponseEntity<Resource> serveMasterFile(
            @PathVariable String videoId
    )
    {

        ///Creating Path;
        Path path = Paths.get(videoHls, videoId, "master.m3u8");

        if(!Files.exists(path)){
            return ResponseEntity.notFound().build();
        }

        Resource resource = new FileSystemResource(path);


        return ResponseEntity.ok()
                .body(resource);

    }

     //server hls playlist.m2u8

    @GetMapping(
            value = "/{videoId}/{quality}/playlist.m3u8",
            produces = "application/vnd.apple.mpegurl"
    )
    public ResponseEntity<Resource> serveplaylistFile(
            @PathVariable String videoId,
            @PathVariable String quality

    )
    {

        ///Creating Path;
        Path path = Paths.get(videoHls, videoId,  quality,"playlist.m3u8");

        if(!Files.exists(path)){
            return ResponseEntity.notFound().build();


        }

        Resource resource = new FileSystemResource(path);


        return ResponseEntity.ok()
                .body(resource);

    }

    @GetMapping(
            value = "/{videoId}/{quality}/{segment}.ts",
            produces = "video/mp2t"
    )
    public ResponseEntity<Resource> serveSegmentFile(
            @PathVariable String videoId,
            @PathVariable String quality,
            @PathVariable String segment
    ){
        ///Creating Path;
        Path path = Paths.get(videoHls, videoId, quality, segment+".ts");

        if(!Files.exists(path)){
            return ResponseEntity.notFound().build();        }

        Resource resource = new FileSystemResource(path);


        return ResponseEntity.ok()
                .body(resource);
    }


}




