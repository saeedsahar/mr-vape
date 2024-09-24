package org.stand.springbootecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.stand.springbootecommerce.entity.ProductLabel;

public interface ProductLabelsRepository extends JpaRepository<ProductLabel,Long> {
}
