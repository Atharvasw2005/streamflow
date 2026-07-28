package com.streaming_app_backend.Dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VideoUploadResponseDto {

    private Long video_id;
    private String title;
    private String description;
    private String contentType;
    private String filePath;
    private String Message;
}
