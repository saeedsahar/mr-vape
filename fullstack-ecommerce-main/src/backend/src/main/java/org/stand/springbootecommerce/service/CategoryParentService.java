package org.stand.springbootecommerce.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.stand.springbootecommerce.dto.CategoryParentDTO;
import org.stand.springbootecommerce.entity.Brand;
import org.stand.springbootecommerce.entity.CategoryParent;
import org.stand.springbootecommerce.repository.BrandRepository;
import org.stand.springbootecommerce.repository.CategoryParentRepository;

import java.util.List;

@Service
public class CategoryParentService {

    @Autowired
    CategoryParentRepository categoryParentRepository;

    public List<CategoryParent> getParent(){
        return categoryParentRepository.findParentCategoriesWithBrands();

    }
}
