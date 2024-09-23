package org.stand.springbootecommerce.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.stand.springbootecommerce.dto.ProductLookup;
import org.stand.springbootecommerce.entity.Brand;
import org.stand.springbootecommerce.repository.BrandRepository;
import org.stand.springbootecommerce.repository.CategoryRepository;

import java.util.List;
import java.util.Optional;

@Service
public class BrandService {
    @Autowired
    BrandRepository brandRepository;
    @Autowired
    CategoryRepository categoryRepository;


    public List<Brand> getBrandList(){
       return brandRepository.findAll();

    }

    public Optional<Brand> getBrandById(Long id){
        return brandRepository.findById(id);

    }
    public ProductLookup getProductLookup(){

        return new ProductLookup(categoryRepository.getCategories(),brandRepository.getDistinctBrandID());
    }
}
