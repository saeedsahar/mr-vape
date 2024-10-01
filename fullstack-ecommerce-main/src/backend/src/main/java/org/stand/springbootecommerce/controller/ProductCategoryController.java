package org.stand.springbootecommerce.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.stand.springbootecommerce.dto.CategoryParentDTO;
import org.stand.springbootecommerce.entity.Category;
import org.stand.springbootecommerce.entity.CategoryParent;
import org.stand.springbootecommerce.service.BrandService;
import org.stand.springbootecommerce.service.CategoryParentService;
import org.stand.springbootecommerce.service.ProductCategoryService;

import java.util.List;


@CrossOrigin(origins = "https://ec2-18-133-243-152.eu-west-2.compute.amazonaws.com")
@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/category")
public class ProductCategoryController {

    private final ProductCategoryService productCategoryService;
    private final BrandService brandService;
    private final CategoryParentService categoryParentService;



    // GET api/v1/category
    @GetMapping
    public ResponseEntity<List<Category>> getProductCategories() {
//       List<ProductCategory> category= productCategoryService.getProductCategories();
//       Set<Category> category =brandService.getBrandList().stream().map(p->p.getCategory()).collect(Collectors.toSet());
        List<Category> parentList=productCategoryService.getProductCategories();
//        List<ProductCategory> brand=  productCategoryService.getAllCategoriesWithBrands();

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(parentList);
    }

    // GET api/v1/category/{id}
    @GetMapping("/{id}")
    public ResponseEntity<Category> getProductCategoryById(@PathVariable(name = "id") Long id) {

        Category category =brandService.getBrandById(id).get().getCategory();

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(category);
    }

    // POST api/v1/category {ProductCategory}
    @PostMapping
    public ResponseEntity<Category> saveProductCategory(@Valid @RequestBody Category productCategory){
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(productCategoryService.addProductCategory(productCategory));
    }

}