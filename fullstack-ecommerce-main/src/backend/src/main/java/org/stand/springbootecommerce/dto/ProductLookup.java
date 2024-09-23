package org.stand.springbootecommerce.dto;

import java.util.List;

public class ProductLookup {

    List<LookUP> categoryList;
    List<LookUP> brandList;
    public ProductLookup(){}
    public ProductLookup(List<LookUP> categoryList, List<LookUP> brandList) {
        this.categoryList = categoryList;
        this.brandList = brandList;
    }

    public List<LookUP> getCategoryList() {
        return categoryList;
    }

    public void setCategoryList(List<LookUP> categoryList) {
        this.categoryList = categoryList;
    }

    public List<LookUP> getBrandList() {
        return brandList;
    }

    public void setBrandList(List<LookUP> brandList) {
        this.brandList = brandList;
    }
}
