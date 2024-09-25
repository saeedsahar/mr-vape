package org.stand.springbootecommerce.dto;

import org.stand.springbootecommerce.entity.Flavours;
import org.stand.springbootecommerce.entity.ProductLabel;

import java.util.List;

public class ProductLookup {

    List<LookUP> categoryList;
    List<LookUP> brandList;
    List<Flavours> flavoursList;
    List<ProductLabel> productLabelList;
    public ProductLookup(){}
    public ProductLookup(List<ProductLabel> productLabelList,List<Flavours> flavoursList,List<LookUP> categoryList, List<LookUP> brandList) {
        this.categoryList = categoryList;
        this.brandList = brandList;
        this.flavoursList = flavoursList;
        this.productLabelList = productLabelList;
    }

    public List<ProductLabel> getProductLabelList() {
        return productLabelList;
    }

    public void setProductLabelList(List<ProductLabel> productLabelList) {
        this.productLabelList = productLabelList;
    }

    public List<Flavours> getFlavoursList() {
        return flavoursList;
    }

    public void setFlavoursList(List<Flavours> flavoursList) {
        this.flavoursList = flavoursList;
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
