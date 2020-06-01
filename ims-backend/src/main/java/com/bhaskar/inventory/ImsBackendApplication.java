package com.bhaskar.inventory;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;
import springfox.documentation.spring.data.rest.configuration.SpringDataRestConfiguration;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
public class ImsBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(ImsBackendApplication.class, args);
    }

}
