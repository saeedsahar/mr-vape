package org.stand.springbootecommerce.service.impl;


import com.fasterxml.jackson.databind.JsonNode;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.stand.springbootecommerce.dto.request.FlavourDTO;
import org.stand.springbootecommerce.dto.request.ProductRequest;
import org.stand.springbootecommerce.entity.Brand;
import org.stand.springbootecommerce.entity.Product;
import org.stand.springbootecommerce.entity.ProductFlavour;
import org.stand.springbootecommerce.entity.ProductImage;
import org.stand.springbootecommerce.repository.*;
import org.stand.springbootecommerce.service.ProductService;
import org.stand.springbootecommerce.service.S3Service;

import java.io.IOException;
import java.util.*;

@RequiredArgsConstructor
@Service
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final ProductImageRepository productImageRepository;
    private final ProductFlavourRepository productFlavourRepository;
    private final CategoryRepository productCategoryRepository;
    private final Logger LOG = LoggerFactory.getLogger(ProductServiceImpl.class);
    private final S3Service s3Service;
    private final BrandRepository brandRepository;

    @Override
    public Page<Product> getProducts(String query, Integer pageNumber, Integer pageSize) {
        return query == null ? productRepository.findAll(PageRequest.of(pageNumber, pageSize)) : searchProducts(query, pageNumber, pageSize);
    }

    @Override
    public List<Product> getProducts(String query) {
        return query == null ? productRepository.findAll(): searchProducts(query);
    }

    @Override
    public List<Product> getProductsByCategoryName(String categoryName) {
        return List.of();
    }

    @Override
    public List<Product> getProductsByCategoryId(Long categoryId) {
        return List.of();
    }

//    @Override
//    public List<Product> getProductsByCategoryName(String categoryName) {
//        return productRepository.findByCategoryId(
//                productCategoryRepository
//                        .findByName(categoryName)
//                        .orElseThrow(() -> new NoSuchElementException("ProductCategory with name='%s' not found".formatted(categoryName)))
//                        .getId()
//        );
//    }

//    @Override
//    public List<Product> getProductsByCategoryId(Long categoryId) {
//        return productRepository.findByCategoryId(categoryId);
//    }

    @Override
    public Product getProductById(Long id) {
        return productRepository
                .findById(id)
                .orElseThrow(() -> new NoSuchElementException("Product with id='%d' not found".formatted(id)));
    }

    @Override
    @Transactional
    public Boolean saveOrUpdateProduct(ProductRequest request, List<MultipartFile> file)  {
        boolean status=false;
        if(!request.equals(null)) {
            Product product = new Product();
            if(request.getId()!=null) {
                product.setId(request.getId());  //update

            }
            product.setName(request.getName());
            product.setShortDescription(request.getShort_description());
            product.setDescription(request.getDescription());
            product.setProductLabel(request.getProduct_label());
            product.setPrice(request.getPrice());
//            Brand brand=new Brand();
//            brand.setId(request.getBrand_id());
            Brand brand = brandRepository.findById(request.getBrand_id()).orElseThrow(() -> new EntityNotFoundException("Brand not found"));

            product.setBrand(brand);
                if(file.size()>0) {
                    try {
                        product.setImage(s3Service.uploadImage(request.getName()+"/cover", file.get(0)));
                    } catch (IOException e){
                        e.printStackTrace();
                    }
                }
              Product postProd=  productRepository.saveAndFlush(product);

            List<ProductImage> imageList=new ArrayList<>();
            for(int i=1;i<=file.size()-1;i++){
                    ProductImage productImage= new ProductImage();
                    productImage.setProductId(postProd);
                    try {
                        productImage.setImage(s3Service.uploadImage(request.getName()+"/others", file.get(i)));
                    }catch (IOException e){
                        e.printStackTrace();
                    }

                imageList.add(productImage);

                }

            List<ProductFlavour> flavourList=new ArrayList<>();
                for(FlavourDTO p:request.getFlavours()) {


                        ProductFlavour productFlavour = new ProductFlavour();
                    if(request.getId()!=null ) {
                        productFlavour.setId(p.getId());
                    }
                    productFlavour.setProductId(postProd);
                    productFlavour.setFlavour(p.getFlavour());
                    productFlavour.setQuantity(p.getQuantity());
                    flavourList.add(productFlavour);
                }
            productFlavourRepository.saveAllAndFlush(flavourList);
            productImageRepository.saveAllAndFlush(imageList);
            status =true;

        }
        return status;
    }

    @Override
    public Page<Product> searchProducts(String query, Integer pageNumber, Integer pageSize) {
        if(query.equals("Trending")){
           return productRepository.findByProductLabelContainingIgnoreCase(query, PageRequest.of(pageNumber, pageSize));

        }
        return productRepository.findByNameProdAndBrand(query, PageRequest.of(pageNumber, pageSize));
    }



    @Override
    public List<Product> searchProducts(String query) {
        return productRepository.findByNameContainingIgnoreCase(query);
    }


}