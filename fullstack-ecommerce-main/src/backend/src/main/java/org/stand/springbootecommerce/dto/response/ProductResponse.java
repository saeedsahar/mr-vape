package org.stand.springbootecommerce.dto.response;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

// (?) remove jakarta.validation.constraints.* in Response dto
@Getter
@Setter
public class ProductResponse {
    @NotNull
    private Long id;

    @NotBlank
    @Size(max = 80)
    private String name;

    @NotBlank
    @Size(max = 255)
    private String description;

    @NotBlank
    @Size(max = 80)
    private String shortDescription;

    @NotNull
    @PositiveOrZero
    private int quantity = 0;

    @NotNull
    @Positive
    private BigDecimal price;

    @NotBlank
    @Size(max = 255)
    // @Pattern(regexp = "^https?://.*\\.(png|jpg|jpeg)$")
    private String image;

    @NotNull
    private Long categoryId;
}