package org.stand.springbootecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.stand.springbootecommerce.entity.ProductFlavour;

@Repository
public interface ProductFlavourRepository extends JpaRepository<ProductFlavour,Long> {
}
