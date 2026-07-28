package com.streaming_app_backend.rabbitMQ.consumer;

import com.streaming_app_backend.rabbitMQ.configure.RabbitMQConfig;
import com.streaming_app_backend.services.Impl.VideoProcessingService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class RabbitMQConsumer {
    private final VideoProcessingService videoProcessingService;

    //Construction Injection
    public RabbitMQConsumer(VideoProcessingService videoProcessingService) {
        this.videoProcessingService = videoProcessingService;
    }

    private static final Logger LOGGER = LoggerFactory.getLogger(RabbitMQConsumer.class);

    @RabbitListener(queues = {"${rabbitmq.queue.name}"})
    public void consume(Long videoId) throws IOException {
        LOGGER.error("Received video id {}", videoId);
        videoProcessingService.processVideo(videoId);
    }
}
