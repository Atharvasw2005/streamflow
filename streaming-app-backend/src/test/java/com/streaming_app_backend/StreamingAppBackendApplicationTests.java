package com.streaming_app_backend;

import com.streaming_app_backend.repositories.VideoRepository;
import com.streaming_app_backend.services.Impl.VideoProcessingService;
import com.streaming_app_backend.services.Impl.VideoServiceImpl;
import com.streaming_app_backend.services.VideoService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class StreamingAppBackendApplicationTests {

	@Autowired
    VideoProcessingService videoService;



	@Test
	void contextLoads() {
		videoService.processVideo(8);
	}

}
