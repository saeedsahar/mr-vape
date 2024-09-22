package org.stand.springbootecommerce.service;

import org.stand.springbootecommerce.entity.Category;

import java.util.List;

public interface ProductCategoryService {
    List<Category> getProductCategories();
    Category getProductCategoryById(Long id);
    Category addProductCategory(Category productCategory);
    List<Category> getAllCategoriesWithBrands();
}