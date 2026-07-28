package com.streaming_app_backend.rabbitMQ.producer;


import com.streaming_app_backend.rabbitMQ.configure.RabbitMQConfig;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RabbitMQProducer {

    @Value("${rabbitmq.exchange.name}")
    private String exchange;

    @Value("${rabbitmq.key.value}")
    private String key;

    private final RabbitTemplate rabbitTemplate;
    private static final Logger LOGGER = LoggerFactory.getLogger(RabbitMQProducer.class);


    public void senndMessage(Long videoID) {

            rabbitTemplate.convertAndSend(
                    exchange,
                    key,
                    videoID
            );

            LOGGER.info("sent message to exchange: {}, key: {}", exchange, key);
    }

}
