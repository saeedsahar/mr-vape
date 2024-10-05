package org.stand.springbootecommerce.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.stand.springbootecommerce.dto.CategoryParentDTO;
import org.stand.springbootecommerce.entity.Category;
import org.stand.springbootecommerce.entity.CategoryParent;
import org.stand.springbootecommerce.entity.Product;
import org.stand.springbootecommerce.service.BrandService;
import org.stand.springbootecommerce.service.CategoryParentService;
import org.stand.springbootecommerce.service.ProductCategoryService;
import org.stand.springbootecommerce.service.impl.ProductCategoryServiceImpl;

import java.util.List;


@CrossOrigin(origins = {"http://localhost:4200", "https://vapeplanet.co.uk", "https://www.vapeplanet.co.uk"})
@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/category")
public class ProductCategoryController {

    private final ProductCategoryServiceImpl productCategoryService;
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
    public ResponseEntity<List<Product>> getProductCategoryById(@PathVariable(name = "id") Long id) {

        List<Product> products =productCategoryService.getCategoriesProductList(id);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(products);
    }

    // POST api/v1/category {ProductCategory}
    @PostMapping
    public ResponseEntity<Category> saveProductCategory(@Valid @RequestBody Category productCategory){
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(productCategoryService.addProductCategory(productCategory));
    }

}