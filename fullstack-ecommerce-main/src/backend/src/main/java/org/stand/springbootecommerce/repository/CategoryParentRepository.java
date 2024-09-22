package org.stand.springbootecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.stand.springbootecommerce.entity.CategoryParent;

import java.util.List;

@Repository
public interface CategoryParentRepository extends JpaRepository<CategoryParent, Long> {

    @Query("SELECT DISTINCT pc FROM CategoryParent pc ")
    List<CategoryParent> findParentCategoriesWithBrands();



}