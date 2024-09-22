package org.stand.springbootecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.stand.springbootecommerce.entity.Brand;

@Repository
public interface BrandRepository extends JpaRepository<Brand, Long> {

}
