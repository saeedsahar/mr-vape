package org.stand.springbootecommerce.dto.response;


import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BrandResponse {


    private Integer id;
    private String name;
    private String description;
    private String image;
}
