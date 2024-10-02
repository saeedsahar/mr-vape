package org.stand.springbootecommerce.service;

import org.stand.springbootecommerce.entity.Category;
import org.stand.springbootecommerce.entity.Product;

import java.util.List;

public interface ProductCategoryService {
    List<Category> getProductCategories();
    Category getProductCategoryById(Long id);
    public List<Product> getCategoriesProductList(Long id);
    Category addProductCategory(Category productCategory);
    List<Category> getAllCategoriesWithBrands();
}