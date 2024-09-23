package org.stand.springbootecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.stand.springbootecommerce.dto.LookUP;
import org.stand.springbootecommerce.entity.Category;
//import org.stand.springbootecommerce.entity.ProductCategory;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    Optional<Category> findByName(String name);

    @Query("SELECT c FROM Category c LEFT JOIN FETCH c.brandList")
    List<Category> getAllCategoriesWithBrands();

    @Query("SELECT new org.stand.springbootecommerce.dto.LookUP(c.id,c.name)  FROM Category c")
    List<LookUP> getCategories();
}