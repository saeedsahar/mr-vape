package org.stand.springbootecommerce.service.impl;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.stand.springbootecommerce.entity.Category;
import org.stand.springbootecommerce.entity.Product;
import org.stand.springbootecommerce.repository.BrandRepository;
import org.stand.springbootecommerce.repository.CategoryRepository;
import org.stand.springbootecommerce.repository.ProductRepository;
import org.stand.springbootecommerce.service.ProductCategoryService;

import java.util.List;
import java.util.NoSuchElementException;

@RequiredArgsConstructor
@Service
public class ProductCategoryServiceImpl implements ProductCategoryService {
    private final CategoryRepository productCategoryRepository;
    private final BrandRepository brandRepository;
    private final ProductRepository productRepository;

    @Override
    public List<Category> getProductCategories() {
        return productCategoryRepository.findAll();
    }

    @Override
    public Category getProductCategoryById(Long id) {
        return productCategoryRepository
                .findById(id)
                .orElseThrow(() -> new NoSuchElementException("ProductCategory with id='%d' not found".formatted(id)));
    }
    @Override
    public List<Product> getCategoriesProductList(Long id) {
       List<Long> brandIds= brandRepository
                .getBrandsDistinctIds(id);

       List<Product> productList=productRepository.getListofProductByBrandIds(brandIds);
//                .orElseThrow(() -> new NoSuchElementException("ProductCategory with id='%d' not found".formatted(id)));

        return productList;
    }

    @Override
    public Category addProductCategory(Category productCategory) {
        return productCategoryRepository.save(productCategory);
    }

    @Override
    public List<Category> getAllCategoriesWithBrands() {
        return productCategoryRepository.getAllCategoriesWithBrands();
    }

}