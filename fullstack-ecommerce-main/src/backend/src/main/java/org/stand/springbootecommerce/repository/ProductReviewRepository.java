package org.stand.springbootecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.stand.springbootecommerce.entity.ProductReviews;

@Repository
public interface ProductReviewRepository extends JpaRepository<ProductReviews,Long> {
}
