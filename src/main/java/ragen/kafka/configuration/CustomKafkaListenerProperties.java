package ragen.kafka.configuration;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import ragen.kafka.model.CustomKafkaListenerProperty;

import java.util.Map;

@Data

@ConfigurationProperties(prefix = "custom.kafka")
public class CustomKafkaListenerProperties {

    private Map<String, CustomKafkaListenerProperty> listeners;
}
