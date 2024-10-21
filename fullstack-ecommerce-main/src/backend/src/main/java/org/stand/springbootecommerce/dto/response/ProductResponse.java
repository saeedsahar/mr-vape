package org.stand.springbootecommerce.dto.response;

import jakarta.persistence.Column;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.Hibernate;
import org.stand.springbootecommerce.entity.*;

import java.math.BigDecimal;
import java.util.List;

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
    @Size(max = 1000)
    private String description;

    @NotBlank
    @Size(max = 150)
    private String shortDescription;

    @NotNull
    @PositiveOrZero
    private int quantity = 0;

    @NotNull
    @Positive
    private BigDecimal price;

    @NotNull
    @Positive
    private BigDecimal wasPrice;

    @NotBlank
    @Size(max = 255)
    // @Pattern(regexp = "^https?://.*\\.(png|jpg|jpeg)$")
    private String image;

    @NotNull
    private Long categoryId;



    private List<ProductFlavour> productFlavours;
    private List<ProductImage> productImages;
    private List<ProductLiquidCapacity> bottleSize;
    private String nocotineStrength;
    private String nocotineType;
    private String productLabel;
    private long brandId;
    private String keySellingPoints;
    private String productSpec;
    private List<ProductReviewResponse> reviewResponseList;

//    private List<OrderItems> orderItemsList;
//    Hibernate: select p1_0.id,p1_0.bottle_size,p1_0.brand_id,p1_0.category_id,p1_0.description,p1_0.flavour_type,p1_0.image,p1_0.name,p1_0.nocotine_strength,p1_0.nocotine_type,p1_0.price,p1_0.product_label,p1_0.quantity,p1_0.short_description from product p1_0 where upper(p1_0.name) like upper(?) escape '\\' limit ?,?


}