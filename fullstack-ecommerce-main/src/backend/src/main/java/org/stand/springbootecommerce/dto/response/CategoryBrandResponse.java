package org.stand.springbootecommerce.dto.response;

import lombok.Getter;
import lombok.Setter;
import org.stand.springbootecommerce.entity.Brand;
import org.stand.springbootecommerce.entity.Category;
import org.stand.springbootecommerce.entity.Product;

import java.util.List;
import java.util.Set;

@Getter
@Setter
public class CategoryBrandResponse {

   private Category category;
   private Set<Brand> brandList;
   private List<Product> productList;





}
