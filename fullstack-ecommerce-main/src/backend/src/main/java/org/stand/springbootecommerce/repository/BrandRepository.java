package org.stand.springbootecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.stand.springbootecommerce.dto.LookUP;
import org.stand.springbootecommerce.entity.Brand;

import java.util.List;

@Repository
public interface BrandRepository extends JpaRepository<Brand, Long> {


    @Query("SELECT new org.stand.springbootecommerce.dto.LookUP(c.id,c.name) FROM Brand c")
    List<LookUP> getDistinctBrandID();

}
