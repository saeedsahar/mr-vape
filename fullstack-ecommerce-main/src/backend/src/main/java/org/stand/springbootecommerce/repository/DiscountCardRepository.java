package org.stand.springbootecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.stand.springbootecommerce.entity.CartDiscount;

public interface DiscountCardRepository extends JpaRepository<CartDiscount,Long> {

    @Query("select c from CartDiscount c where c.promoCode=:code")
    CartDiscount findDiscountByCode(@Param("code") String code);
}
