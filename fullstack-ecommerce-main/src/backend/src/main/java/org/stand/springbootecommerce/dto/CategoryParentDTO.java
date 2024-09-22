package org.stand.springbootecommerce.dto;

import org.stand.springbootecommerce.entity.Category;

import java.util.List;

public class CategoryParentDTO {


        private Long id;

        private String name;
        private String desciption;
        private String image; // can be null
        private String shortDescription; // can be null
        private List<CategoryDTO> categoryList;
        private List<BrandDTO> brandList;
        public CategoryParentDTO(){}

        public CategoryParentDTO(Long id, String name, String desciption, String image, String shortDescription, List<CategoryDTO> categoryList, List<BrandDTO> brandList) {
                this.id = id;
                this.name = name;
                this.desciption = desciption;
                this.image = image;
                this.shortDescription = shortDescription;
                this.categoryList = categoryList;
                this.brandList = brandList;
        }


        public Long getId() {
                return id;
        }

        public void setId(Long id) {
                this.id = id;
        }

        public String getName() {
                return name;
        }

        public void setName(String name) {
                this.name = name;
        }

        public String getDesciption() {
                return desciption;
        }

        public void setDesciption(String desciption) {
                this.desciption = desciption;
        }

        public String getImage() {
                return image;
        }

        public void setImage(String image) {
                this.image = image;
        }

        public String getShortDescription() {
                return shortDescription;
        }

        public void setShortDescription(String shortDescription) {
                this.shortDescription = shortDescription;
        }

        public List<CategoryDTO> getCategoryList() {
                return categoryList;
        }

        public void setCategoryList(List<CategoryDTO> categoryList) {
                this.categoryList = categoryList;
        }

        public List<BrandDTO> getBrandList() {
                return brandList;
        }

        public void setBrandList(List<BrandDTO> brandList) {
                this.brandList = brandList;
        }
}
