package org.stand.springbootecommerce.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.codec.multipart.FilePart;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.stand.springbootecommerce.dto.ProductLookup;
import org.stand.springbootecommerce.dto.request.ProductRequest;
import org.stand.springbootecommerce.dto.response.PageableResponse;
import org.stand.springbootecommerce.dto.response.ProductResponse;
import org.stand.springbootecommerce.entity.Product;
import org.stand.springbootecommerce.service.BrandService;
import org.stand.springbootecommerce.service.ProductService;
import org.stand.springbootecommerce.service.S3Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "https://ec2-18-133-243-152.eu-west-2.compute.amazonaws.com")
@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/product")
public class ProductController {
    private final Logger LOG = LoggerFactory.getLogger(ProductController.class);
    private final ProductService productService;
    private final ModelMapper modelMapper;
    private final BrandService brandService;


    private final S3Service s3Service;



    // GET api/v1/product
    // GET api/v1/product?q={Abc}
    @GetMapping
    public ResponseEntity<PageableResponse> getProducts(
            // @RequestParam(name = "category", required = false) String category,
            @RequestParam(name = "q", required = false) String query,
            @RequestParam(name = "pageNumber", required = true) Integer pageNumber, // -> pageIndex
            @RequestParam(name = "pageSize", required = true) Integer pageSize
            ) throws InterruptedException {
        // TODO: use modelMappings
        Page<Product> productPage = productService.getProducts(query, pageNumber, pageSize);
        List<Product> prodList= productPage.getContent().stream().toList();
        List<ProductResponse> resList=new ArrayList<>();
        for(Product p:prodList){
            ProductResponse res=  new ProductResponse();
                    res.setId(p.getId());
                    res.setName(p.getName());
                    res.setImage(p.getImage());
                    res.setDescription(p.getDescription());
                    res.setQuantity(p.getQuantity());
//                    res.setCategoryId(p.getCategory().getId());
                    res.setPrice(p.getPrice());
                    res.setShortDescription(p.getShortDescription());
                    res.setProductLabel(p.getProductLabel());
                    res.setProductFlavours(p.getProductFlavourList());
                    res.setProductImages(p.getProductImageList());


            resList.add(res);
        }
        new ProductResponse();
        PageableResponse<ProductResponse> pageableResponse = new PageableResponse<ProductResponse>(productPage.getTotalElements(), resList);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(pageableResponse);
    }

    // POST api/v1/product {ProductRequest}
    @PostMapping(value = "/save")
    public ResponseEntity<Boolean> saveProduct(@RequestPart("product") String product, @RequestPart("file") List<MultipartFile> file) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        ProductRequest productRequest = objectMapper.readValue(product, ProductRequest.class);

        try {
            JsonNode jsonNode = objectMapper.readTree(product);
            productService.saveOrUpdateProduct(productRequest,file);

        } catch (Exception e) {
            e.printStackTrace();
        }

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        true

                );
    }

    // GET api/v1/product/{id}
    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse> getProductById(@PathVariable(name = "id") Long id) {
        ProductResponse res=  new ProductResponse();
        Product p=productService.getProductById(id);
        res.setId(p.getId());
        res.setName(p.getName());
        res.setImage(p.getImage());
        res.setDescription(p.getDescription());
        res.setQuantity(p.getQuantity());
//        res.setCategoryId(p.getCategory().getId());
        res.setPrice(p.getPrice());
        res.setShortDescription(p.getShortDescription());
        res.setProductLabel(p.getProductLabel());
        res.setProductFlavours(p.getProductFlavourList());
        res.setProductImages(p.getProductImageList());
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(

        res

                );
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            String imageUrl = s3Service.uploadImage("mine1", file); // Specify the folder name
            return ResponseEntity.ok(imageUrl);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Failed to upload image: " + e.getMessage());
        }
    }
}



