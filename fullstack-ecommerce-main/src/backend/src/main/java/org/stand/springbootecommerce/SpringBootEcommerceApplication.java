package org.stand.springbootecommerce;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.stand.springbootecommerce.config.SSLUtil;

@SpringBootApplication
@OpenAPIDefinition
public class SpringBootEcommerceApplication {

    public static void main(String[] args) {

        SSLUtil.disableSSLVerification();
        SpringApplication.run(SpringBootEcommerceApplication.class, args);
    }

}
