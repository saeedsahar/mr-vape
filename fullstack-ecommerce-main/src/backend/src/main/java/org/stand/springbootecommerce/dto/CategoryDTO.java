package org.stand.springbootecommerce.dto;

import java.util.List;

public class CategoryDTO {

    private Long id;
    private String description;
    private String name;
    private String image; // can be null
    private List<BrandDTO> brandList;

    public CategoryDTO(){}
    public CategoryDTO(Long id, String description, String name, String image, List<BrandDTO> brandList) {
        this.id = id;
        this.description = description;
        this.name = name;
        this.image = image;
        this.brandList = brandList;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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

    public List<BrandDTO> getBrandList() {
        return brandList;
    }

    public void setBrandList(List<BrandDTO> brandList) {
        this.brandList = brandList;
    }
}
