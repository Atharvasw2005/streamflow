package com.streaming_app_backend.rabbitMQ.configure;


import org.springframework.amqp.core.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {



    @Value("${rabbitmq.queue.name}")
    private String queue;

    @Value("${rabbitmq.exchange.name}")
    private String exchange;

    @Value("${rabbitmq.key.value}")
    private String key;

    //Spring bean for rabbitmq queue
    @Bean
    public Queue getQueue() {
        return new Queue(queue,true);
    }

    ////Spring bean for rabbitmq Exchange
    @Bean
    public DirectExchange getExchange() {
        return new DirectExchange(exchange);
    }

    //Binding between queue and exchange with key
    @Bean
    public Binding getBinding() {
        return BindingBuilder
                .bind(getQueue())
                .to(getExchange())
                .with(key);
    }


    //In Addition we need to configure 3 more bean but
    // with the help of Spring AutoConfigure this bean automatically create
    // so we not create this

    //Connectionfactory
    //RabbitTemplate
    //RabbitAdmin
}
