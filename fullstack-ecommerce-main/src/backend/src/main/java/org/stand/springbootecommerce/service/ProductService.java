package org.stand.springbootecommerce.service;

import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;
import org.stand.springbootecommerce.dto.ProductLookup;
import org.stand.springbootecommerce.dto.request.ProductRequest;
import org.stand.springbootecommerce.dto.request.ReviewRequest;
import org.stand.springbootecommerce.entity.CartDiscount;
import org.stand.springbootecommerce.entity.Product;

import java.util.List;

public interface ProductService {
    Page<Product> getProducts(String query, Integer page, Integer size);
    List<Product> getProducts(String query);
    List<Product> getProductsByCategoryName(String categoryName);
    List<Product> getProductsByCategoryId(Long categoryId);
    Product getProductById(Long id);
    Boolean saveOrUpdateProduct(ProductRequest productRequest, List<MultipartFile> file) ;
    Boolean saveOrUpdateProductReview(ReviewRequest reviewRequest) ;

    Page<Product> searchProducts(String query, Integer page, Integer size);
    List<Product> searchProducts(String query);
    CartDiscount getDiscountCode(String code);

}