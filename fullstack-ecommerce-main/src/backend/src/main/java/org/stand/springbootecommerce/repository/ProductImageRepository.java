package org.stand.springbootecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.stand.springbootecommerce.entity.ProductImage;

@Repository
public interface ProductImageRepository extends JpaRepository<ProductImage,Long> {
}
