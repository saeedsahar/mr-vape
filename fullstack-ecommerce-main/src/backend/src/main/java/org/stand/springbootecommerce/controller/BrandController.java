package org.stand.springbootecommerce.controller;


import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.stand.springbootecommerce.dto.response.BrandProductDTO;
import org.stand.springbootecommerce.dto.response.ProductResponse;
import org.stand.springbootecommerce.entity.Brand;
import org.stand.springbootecommerce.entity.Product;
import org.stand.springbootecommerce.service.BrandService;
import org.stand.springbootecommerce.service.ProductService;

import javax.swing.text.html.Option;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200") //TODO: tmp sol
@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/brand")
public class BrandController {

    private final Logger LOG = LoggerFactory.getLogger(ProductController.class);
    private final BrandService brandService;

    // GET api/v1/brand/{id}
    @GetMapping("/{id}")
    public ResponseEntity<BrandProductDTO> getBrandById(@PathVariable(name = "id") Long id) {
        BrandProductDTO res=  new BrandProductDTO();
        Optional<Brand> brand=brandService.getBrandById(id);
        res.setId(brand.get().getId());
        res.setName(brand.get().getName());
        res.setImage(brand.get().getImage());
        res.setDescription(brand.get().getDescription());
        res.setProductList(brand.get().getProductList());

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(

                        res

                );
    }
}
