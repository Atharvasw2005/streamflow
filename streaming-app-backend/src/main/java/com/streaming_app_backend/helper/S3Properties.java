package com.streaming_app_backend.helper;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@ConfigurationProperties(prefix = "aws.s3")
@Component
@Getter
@Setter
public class S3Properties {

    private String bucketName;
    private String region;
    private String accessKey;
    private String secretKey;

}
