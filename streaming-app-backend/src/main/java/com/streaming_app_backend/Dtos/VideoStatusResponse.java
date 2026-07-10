package com.streaming_app_backend.Dtos;

import com.streaming_app_backend.entities.VideoStatus;

public record VideoStatusResponse(

        Long videoId,
        VideoStatus status

) {}
