package org.stand.springbootecommerce.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.stand.springbootecommerce.entity.Product;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product,Long> {
    Page<Product> findAll(Pageable pageable);
//    List<Product> findByCategoryId(Long categoryId);
@Query("SELECT p FROM Brand b inner join Product p on b.id=p.brand   WHERE (:query IS NULL OR LOWER(p.name) LIKE LOWER(CONCAT('%', :query, '%'))) OR (:query IS NULL OR b.name LIKE LOWER(CONCAT('%', :query, '%')))")
Page<Product> findByNameProdAndBrand(
        @Param("query") String query,
        @Param("pageable") Pageable pageable

);
    Page<Product> findByNameContainingIgnoreCase(String query, Pageable pageable);
    Page<Product> findByProductLabelContainingIgnoreCase(String query, Pageable pageable);
    List<Product> findByNameContainingIgnoreCase(String query);
//    Page<Product> findByCategoryNameContainingIgnoreCase(String query, Pageable pageable);
//    List<Product> findByCategoryNameContainingIgnoreCase(String query);

}