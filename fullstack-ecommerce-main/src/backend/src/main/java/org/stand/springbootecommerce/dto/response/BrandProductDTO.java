package org.stand.springbootecommerce.dto.response;

import org.stand.springbootecommerce.entity.Product;

import java.util.List;

public class BrandProductDTO {

    private Integer id;
    private String name;
    private String image;
    private String description;
    List<Product> productList;

    public BrandProductDTO() {

    }

    public BrandProductDTO(Integer id, String name, String image, String description, List<Product> productList) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.description = description;
        this.productList = productList;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Product> getProductList() {
        return productList;
    }

    public void setProductList(List<Product> productList) {
        this.productList = productList;
    }
}
