package org.stand.springbootecommerce.dto.request;

import jakarta.validation.constraints.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Getter
public class ProductRequest {

    private String name;


    private String description;


    private String short_description;
    private String product_label;
    private BigDecimal price;

    private Long brand_id;


    private List<FlavourDTO> flavours;

    public ProductRequest() {

    }

    public ProductRequest(String name, String description, String short_description, Long brand_id, List<FlavourDTO> flavours) {
        this.name = name;
        this.description = description;
        this.short_description = short_description;
        this.brand_id = brand_id;
        this.flavours = flavours;
    }


    public ProductRequest(String name, String description, String short_description, String product_label, BigDecimal price, Long brand_id, List<FlavourDTO> flavours) {
        this.name = name;
        this.description = description;
        this.short_description = short_description;
        this.product_label = product_label;
        this.price = price;
        this.brand_id = brand_id;
        this.flavours = flavours;
    }

    public String getProduct_label() {
        return product_label;
    }

    public void setProduct_label(String product_label) {
        this.product_label = product_label;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getShort_description() {
        return short_description;
    }

    public void setShort_description(String short_description) {
        this.short_description = short_description;
    }


    public List<FlavourDTO> getFlavours() {
        return flavours;
    }

    public void setFlavours(List<FlavourDTO> flavours) {
        this.flavours = flavours;
    }

    public Long getBrand_id() {
        return brand_id;
    }

    public void setBrand_id(Long brand_id) {
        this.brand_id = brand_id;
    }
}