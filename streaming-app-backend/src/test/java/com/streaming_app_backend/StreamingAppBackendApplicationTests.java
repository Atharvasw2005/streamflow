package com.streaming_app_backend;

import com.streaming_app_backend.repositories.VideoRepository;
import com.streaming_app_backend.services.Impl.VideoProcessingService;
import com.streaming_app_backend.services.Impl.VideoServiceImpl;
import com.streaming_app_backend.services.VideoService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import software.amazon.awssdk.services.s3.S3Client;

@SpringBootTest
class StreamingAppBackendApplicationTests {

	@Autowired
    VideoProcessingService videoService;

	@Autowired
	S3Client s3Client;



//	@Test
//	void contextLoads() {
//		videoService.processVideo(8);
//	}

	@Test
	public void test() {


		System.out.println(s3Client.listBuckets()
				.buckets()
				.toString());
	}

}
